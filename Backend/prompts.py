PLAN_GENERATION_PROMPT = """
Your task is to create a {no_of_days}-day trip plan starting from {user_location}. The trip is categorized as a {tour_type} tour. Please follow the guidelines below:

1. Utilize the provided places and their details to generate the plan, but it is not mandatory to include all of them.
2. If it's not feasible to cover any of given places within {no_of_days}, skip them and focus on creating the best itinerary possible.
3. Ensure the user returns to their original location ({user_location}) by the end of the trip, strictly within {no_of_days} days.
{extra_rules}

# Input:
## List of Places and Details:
{places_desc}

# Output Format:
- Generate the response strictly in JSON format as described below.
- Do not include comments, explanations, or apologies in the response.
- Only include places from the provided list, and return the unique `place_id` for each place.
- The origin and destination fields should reference either one of the listed places or any major city in Nepal.

OUTPUT JSON FORMAT:
```json
{
  "trip_title": "Title of the whole trip", // e.g 5 Days Kathmandu - Janakpur Exploration
  "itinerary": [
    {
      "day": 1,
      "title": "Day's Title",
      "schedule": [
        {
          "type": "visit",  // Options: visit, break, or travel
          "time": "Morning", // Options: Morning, Afternoon, Evening, All day
          "duration": "3 hours",
          "place": "Place Name",
          "place_id": Place_id
        },
        {
          "type": "break",
          "activity": "Lunch",
          "duration": "1 hour"
        },
        {
          "type": "travel",
          "time": "Afternoon Evening",
          "duration": "7 hours",
          "origin": "Current Place",
          "destination": "Destination Place"
        }
      ]
    }
  ]
}```
"""

PLAN_EDIT_PROMPT = """
Your task is to update the user's {no_of_days}-day trip plan based on their new instructions. Follow these guidelines:

1. Make minimal changes; avoid completely reshaping the plan unless required by the user's request.
2. If the user asks to remove a place:
   - Remove it and reallocate the extra time by either:
     - Adding a place from the additional places list below, if feasible.
     - Extending the time at existing places for better exploration.
3. If the user asks to add a place:
   - Add it only if feasible within the given time frame.
   - You may replace a less significant place if necessary to fit the requested addition.
4. Use the user's new instructions and preferences provided in **User's Additional Description** to guide your edits.

**Current Plan:**  
{current_plan}

**User's Instructions for edits:**  
{user_edit_desc}

**Extra Places (for reference):**  
The following places can be used if adjustments are needed. Each includes a name, location, description, and other details:  
{places_desc}

**Output Format:**  
Provide the updated plan in JSON format as follows, generate no other text like apologies or changes you made.
```json
{
  "trip_title": "Title of the whole trip", // e.g 5 Days Kathmandu - Janakpur Exploration
  "itinerary": [
    {
      "day": 1,
      "title": "Day's Title",
      "schedule": [
        {
          "type": "visit",  // Options: visit, break, or travel
          "time": "Morning", // Options: Morning, Afternoon, Evening, All day
          "duration": "3 hours",
          "place": "Place Name",
          "place_id": Place_id
        },
        {
          "type": "break",
          "activity": "Lunch",
          "duration": "1 hour"
        },
        {
          "type": "travel",
          "time": "Afternoon Evening",
          "duration": "7 hours",
          "origin": "Current Place",
          "destination": "Destination Place"
        }
      ]
    }
  ]
}```
"""


def plan_generation_prompt(
        places_desc,
        user_location='Kathmandu', 
        tour_type='Adventure', 
        no_of_days=3, 
        priority_places='',
        priority_activities='',
        priority_place_types=''
    ):
    prompt = PLAN_GENERATION_PROMPT.replace("{no_of_days}", str(no_of_days))
    prompt = prompt.replace("{user_location}", str(user_location))
    prompt = prompt.replace("{tour_type}", str(tour_type))
    prompt = prompt.replace("{places_desc}", str(places_desc))

    extra_rules = ''
    i = 4

    if priority_places:
        extra_rules += f"{i}. Give more privity to {priority_places} if possible\n"
        i+=1
    if priority_activities:
        extra_rules += f"{i}. If possible try to include places where we can {priority_activities}\n"
        i+=1
    if priority_place_types:
        extra_rules += f"{i}. {priority_place_types} Places should be given higher priority \n"
        i+=1

    return prompt


def plan_edit_prompt(
    no_of_days,
    current_plan,
    user_edit_desc,
    places_desc,
):
    prompt = PLAN_EDIT_PROMPT.replace("{no_of_days}", str(no_of_days))
    prompt = prompt.replace("{current_plan}", str(current_plan))
    prompt = prompt.replace("{user_edit_desc}", str(user_edit_desc))
    prompt = prompt.replace("{places_desc}", str(places_desc))

    return prompt