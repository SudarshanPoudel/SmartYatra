import os
from dotenv import load_dotenv

from langchain_core.documents import Document
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings


# Basic setup
load_dotenv()
gemini_api = os.environ['GEMINI_API_KEY']
DEFAULT_COLLECTION_NAME = 'all_places'
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=gemini_api)


# Function to generate detailed desc of any place
def detailed_desc(place_id, name, desc, location, lon, lat, place_type, activities, time):
    return f'''# {name} (id = {place_id}):
    **Location**: {location}, Longitude:{lon}, Latitude: {lat}.
    **General Description**: {name} is a {place_type} place where we can do {activities} and takes around {time} hr. on average to explore.
    **About**: {desc}'''


# Initialize Chroma vector store
def initialize_chroma_client():
    return Chroma(
        collection_name=DEFAULT_COLLECTION_NAME, 
        embedding_function=embeddings,
        persist_directory="./chroma_db"
    )


def get_available_id():
    collection = initialize_chroma_client()
    existing_ids = collection.get(ids=None)['ids']  
    if existing_ids:
        max_id = max(int(id) for id in existing_ids)
        return max_id+1
    else:
        return 1

# Store text chunks in Chroma vector store, replacing existing data if any
def store_chunks(data):
    collection = initialize_chroma_client()
    metadata = {key: value for key, value in data.items() if key != 'description_llm'}
    uuid = data.get('id', get_available_id())
    data['id'] = uuid
    if 'description_llm' not in data:
        data['description_llm'] = detailed_desc(
            place_id=uuid,
            name=data['name'],
            desc=data['desc'],
            location=data['location'],
            lon=data['lon'],
            lat=data['lat'],
            place_type=data['type'],
            activities=data['activities'],
            time=data['required_time']
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


def delete_chunk(id):
    collection = initialize_chroma_client()
    if collection.get(ids=[str(id)])['metadatas']:
        print(collection.get(ids=[str(id)]))
        collection.delete(ids=[str(id)])
        return True
    else:
        return False


# Retrieve top_n chunks similar to a query
def query_chunks(query: str, top_n: int = 10) -> list:
    collection = initialize_chroma_client()
    results = collection.similarity_search(query, k=top_n)
    content = [r.page_content for r in results]
    return content


# Retrieve information of place given the id
def retrieve_place_details(place_id:int)->dict:
    if(int(place_id) == -1):
        try:
            from app import get_plan_data
            plan_data = get_plan_data()
            return {'id': -1,
                'latitude': plan_data['user_lat'],
                'longitude': plan_data['user_long'],
                "name": "",
                "image": ""
                }
        except:
            return {'id': -1,
                'latitude': 0.0,
                'longitude': 0.0,
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
def retrieve_all_places()->dict:
    collection = initialize_chroma_client()
    all_data = collection.get()
    return all_data['metadatas']
