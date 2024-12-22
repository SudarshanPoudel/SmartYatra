from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os
import json

from data import query_place
from prompts import plan_generation_prompt, plan_validation_prompt, plan_edit_prompt


load_dotenv()
gemini_api = os.environ['GEMINI_API_KEY']

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0,
    max_tokens=None,
    timeout=None,
    google_api_key=gemini_api
)

# Function call llm and get response
def get_llm_response(message):
    return llm.invoke(message).content

# Function to format llm json in python dict
def response_into_dict(response):
    r = response.replace("```json\n", "").replace("```", "")
    j = json.loads(r)
    return j

# Function to generate plan
def generate_plan(
    user_location,
    tour_type,
    no_of_days,
    priority_place_types='',
    priority_activities='',
    priority_places='',
    extra_desc='',
    **kwargs
):

    query = f"places for {tour_type} tour from {user_location}. "

    if priority_place_types:
        query += f"{priority_place_types} places."

    if priority_activities:
        query += f"Priority to place with activities: {priority_activities} "
    
    if priority_places:
        query += f"{priority_places} named places. "
    
    if extra_desc:
        query += extra_desc

    similar_places = query_place(query, no_of_days*5)
    places_desc = "\n\n".join(similar_places)

    prompt = plan_generation_prompt(
        places_desc=places_desc,
        user_location=user_location,
        tour_type=tour_type,
        no_of_days=no_of_days,
        priority_activities=priority_activities,
        priority_places=priority_places,
        priority_place_types=priority_place_types
    )

    high_level_plan = get_llm_response(prompt)
    prompt = plan_validation_prompt(
        user_location=user_location,
        high_level_plan=high_level_plan
    )
    response=get_llm_response(prompt)
    response_dict = response_into_dict(response)
    return response_dict


def edit_plan(
    current_plan,
    user_edit_desc,
):
    no_of_days = len(current_plan['itinerary'])
    similar_places = query_place(user_edit_desc, no_of_days*3, only_name=True)
    places_desc = "\n".join(similar_places)
    prompt = plan_edit_prompt(
        no_of_days,
        current_plan,
        user_edit_desc,
        places_desc
    )
    response = get_llm_response(prompt)
    return response_into_dict(response)