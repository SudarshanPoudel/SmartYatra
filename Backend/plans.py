from dotenv import load_dotenv
import os
import json

from langchain_google_genai import ChatGoogleGenerativeAI

from data import query_chunks, retrieve_place_details
from prompts import plan_generation_prompt_1, plan_generation_prompt_2, plan_edit_prompt


load_dotenv()
gemini_api = os.environ['GEMINI_API_KEY']

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0,
    max_tokens=None,
    timeout=None,
    google_api_key=gemini_api
)


def response_into_dict(response):
    r = response.replace("```json\n", "").replace("```", "")
    j = json.loads(r)
    print(j)
    return j



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


    user_desc = f"I am going for {tour_type} tour from {user_location}. "

    if priority_place_types:
        user_desc += f"I love {priority_place_types} places."

    if priority_activities:
        user_desc += f"I want to {priority_activities} "
    
    if priority_places:
        user_desc += f"I want to visit {priority_places} "
    
    if extra_desc:
        user_desc += extra_desc

    similar_places = query_chunks(user_desc, no_of_days*5)
    places_desc = "\n\n".join(similar_places)

    prompt = plan_generation_prompt_1(
        places_desc=places_desc,
        user_location=user_location,
        tour_type=tour_type,
        no_of_days=no_of_days,
        priority_activities=priority_activities,
        priority_places=priority_places,
        priority_place_types=priority_place_types
    )

    high_level_plan = llm.invoke(prompt)
    print(high_level_plan)
    prompt = plan_generation_prompt_2(
        high_level_plan=high_level_plan
    )
    response=llm.invoke(prompt)
    print(response.content)
    response_dict = response_into_dict(response.content)
    return response_dict


def edit_plan(
    current_plan,
    user_edit_desc,
):
    no_of_days = len(current_plan['itinerary'])
    similar_places = query_chunks(user_edit_desc, no_of_days)
    places_desc = "\n\n-----\n\n".join(similar_places)
    prompt = plan_edit_prompt(
        no_of_days,
        current_plan,
        user_edit_desc,
        places_desc
    )
    response = llm.invoke(prompt)
    return response_into_dict(response.content)

