PLAN_GENERATION_PROMPT_1 = """
Your task is to create a {no_of_days}-days trip plan starting from {user_location}. The trip is categorized as a {tour_type} tour.  

### Guidelines:
1. **Place Selection**:  
   - Trip should give priority to {place_type} places.
   - Make sure to include {places}, unless it's not possible to visit any place in given time.
   - Places with {activities} Activities should be prioritized.
   - Select places from the provided list, considering time constraints, proximity, and the type of tour.  
   

2. **Itinerary Creation**:  
  - Distribute the chosen places evenly across the trip’s days.
  - Always begin the itinerary from {user_location}.
  - Ensure the last day ends at the original starting point, {user_location}.
  

3. **Descriptions and Details**:  
   - For each place, include its `place_id`, location, and a short description (1–2 sentences) about what the user should do there.  
   - The descriptions should provide clear, actionable tasks or highlights, e.g., "Explore the ancient temple and enjoy its stunning architecture."  


4. **Output Format**:  
   - Provide the output strictly in Markdown format without any comments, explanations, or apologies.  
   - Include a separate section for each day with places listed in the specified format.  

---

### **Input**  
#### List of Places and Details:  
{places_desc}  

---

### **Output Format**  
```markdown
## Example Output:  
### Day 1:
- **Place Name 1** (ID = `place_id_1`):  
  - Location: `Location of place 1`
  - Duration: 2 Hours  
  - Task: Explore the ancient temple and enjoy the stunning architecture.  

- **Place Name 2** (ID = `place_id_2`):  
  - Location: `Location of place 2`
  - Duration: 1.5 Hours  
  - Task: Walk through the vibrant market and experience local culture.  

### Day 2:
- **Place Name 3** (ID = `place_id_3`):  
  - Location: `Location of place 3`
  - Duration: 3 Hours  
  - Task: Hike the scenic trail and enjoy panoramic mountain views.  

- **Place Name 4** (ID = `place_id_4`):  
  - Location: `Location of place 4`
  - Duration: 3 Hours  
  - Task: Visit the museum to learn about the region’s history and culture.  
"""


PLAN_GENERATION_PROMPT_2 = """
Your task is to create a detailed trip itinerary based on the provided high-level plan.  

### Guidelines:  
1. **Detailed Scheduling**:
   - Add durations for visits, meal breaks, night stays, and travel times.  
   - Ensure the schedule for each day makes full use of available time (Morning, Afternoon, Evening, Night).  

2. **Place Restrictions**:
   - Only use places provided in the high-level plan for visits, meals, and stays.  
   - Trip should strictly start from {user_location}(id = `-1`) and end at initial place back. 

3. **Realistic Itinerary**:
   - Distribute activities sensibly across the day without overcrowding.  
   - Avoid repetitive visits to the same place unless explicitly mentioned in the high-level plan.  
   - Ensure there is sufficient time for rest and transitions between activities. Duration of visit or travel per day should be more than 8 hours and less than 14 hours per day.

4. **Formatting Requirements**:
   - Format the output strictly in the specified JSON structure.  
   - Do not include comments, explanations, or apologies in the output.  
   - Before giving the result, always make sure result is proper json with no mistake.

---

### **Input**  
#### High-Level Plan:  
{high_level_plan}  

---

### **Output JSON Format**:  
```json
{
  "trip_title": "Title of the whole trip", // e.g., 5 Days Kathmandu - Janakpur Exploration
  "itinerary": [
    {
      "day": 1,
      "title": "Day's Title", // e.g., "Exploring Kathmandu"
      "schedule": [
        {
          "type": "visit", // Options: visit, break, travel, stay
          "time": "Morning", // Options: Morning, Afternoon, Evening, Night, All day
          "duration": 3, // In hours
          "place": "Place Name",
          "place_id": Place_id,
          "activity": "Activity to do in that place" // e.g., "Explore the temple and enjoy the local culture"
        },
        {
          "type": "break",
          "activity": "Lunch", // e.g., "Lunch at a local restaurant"
          "duration": 1, 
          "place_id": "Place ID of the lunch spot"
        },
        {
          "type": "travel",
          "time": "Afternoon Evening", // Indicate the travel time slot
          "duration": 7,
          "origin_id": "Place ID of the starting point",
          "destination_id": "Place ID of the destination"
        },
        {
          "type": "stay",
          "time": "Night",
          "place": "Place Name", // Name of the stay location
          "place_id": "Place ID of the stay location"
        }
      ]
    }
  ]
}
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



def plan_generation_prompt_1(
        places_desc,
        user_location='Kathmandu', 
        tour_type='Adventure', 
        no_of_days=3, 
        priority_places='',
        priority_activities='',
        priority_place_types=''
  ):
    prompt = PLAN_GENERATION_PROMPT_1.replace("{no_of_days}", str(no_of_days))
    prompt = prompt.replace("{user_location}", str(user_location))
    prompt = prompt.replace("{tour_type}", str(tour_type))
    prompt = prompt.replace("{places_desc}", str(places_desc))


    if priority_places:
        prompt = prompt.replace("{places}", str(priority_places))
    if priority_activities:
        prompt = prompt.replace("{activities}", priority_activities)
    if priority_place_types:
        prompt = prompt.replace("{place_type}", priority_place_types)

    return prompt


def plan_generation_prompt_2(high_level_plan):
    prompt = PLAN_GENERATION_PROMPT_2.replace("{high_level_plan}", str(high_level_plan))
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