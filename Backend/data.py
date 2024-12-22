# script to connect python with chromadb database

import os
from dotenv import load_dotenv
import random
from langchain_core.documents import Document
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings


# Basic setup
load_dotenv()
gemini_api = os.environ['GEMINI_API_KEY']
DEFAULT_COLLECTION_NAME = 'all_places'
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=gemini_api)

# Function to generate detailed desc of any place
def detailed_desc(id, name, location, latlong, type, activities,required_time, description, **kwargs):
    return f'''# {name} (id = {id}):
    **Location**: {location} ({latlong}).
    **General Description**: {name} is a {type} place where we can do {activities} and takes around {required_time} hr. on average to explore.
    **About**: {description}'''

# Initialize Chroma vector store
def initialize_chroma_client():
    return Chroma(
        collection_name=DEFAULT_COLLECTION_NAME, 
        embedding_function=embeddings,
        persist_directory="./chroma_db"
    )

# Get new available id for chroma
def get_available_id():
    collection = initialize_chroma_client()
    existing_ids = collection.get(ids=None)['ids']  
    if existing_ids:
        max_id = max(int(id) for id in existing_ids)
        return max_id+1
    else:
        return 1

# Store place data in Chroma vector store
def store_place(data):
    collection = initialize_chroma_client()
    metadata = {key: value for key, value in data.items() if key != 'description_llm'}
    uuid = data.get('id', get_available_id())
    data['id'] = uuid
    if 'description_llm' not in data:
        data['description_llm'] = detailed_desc(
            id=uuid,
            name=data['name'],
            location=data['location'],
            latlong=data['latlong'],
            type=data['type'],
            activities=data['activities'],
            required_time=data['required_time'],
            description=data['description'],
            )

    # Create a document with embedding and metadata
    document = Document(
        page_content=data['description_llm'],
        metadata=metadata,
        persist_directory="./chroma_db",
    )
          
    # Add document to the collection
    collection.add_documents(documents=[document], ids=[str(uuid)])
    return uuid

# Function to delete place 
def delete_place(id):
    collection = initialize_chroma_client()
    place = collection.get(ids=[str(id)])['metadatas']
    if place:
        collection.delete(ids=[str(id)])
        return place
    else:
        return False


# Retrieve top_n places similar to a query
def query_place(query: str, top_n: int = 10, only_name=False) -> list:
    collection = initialize_chroma_client()
    results = collection.similarity_search(query, k=top_n)
    if only_name:
        content = [f"{r.metadata.get('name', 'Unknown')} (ID={r.metadata.get('id', -1)})\nLocation=({r.metadata.get('location', 'Search it yourself')})" for r in results]
    else:
        content = [r.page_content for r in results]
        
    return content


# Retrieve information of place given the id
def retrieve_place_details(place_id:int)->dict:
    if(int(place_id) == -1):
        try:
            from app import get_plan_data
            plan_data = get_plan_data()
            return {'id': -1,
                'latlong': f"{plan_data['user_lat']},{plan_data['user_long']}",
                "name": "",
                "image": ""
                }
        except:
            return {'id': -1,
                'latlong': "0.0, 0.0",
                "name": "",
                "image": ""
                }
    collection = initialize_chroma_client()
    try:
        data = collection.get(ids=[str(place_id)])['metadatas'][0]
        return data
    except:
        return None

# Retrieve information of all places
def retrieve_all_places() -> dict:
    collection = initialize_chroma_client()
    all_data = collection.get()
    places = all_data['metadatas']
    random.shuffle(places)
    return places
