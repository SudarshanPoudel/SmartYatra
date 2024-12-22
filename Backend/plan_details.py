import random
from data import retrieve_place_details
import pandas as pd

# Fetch required data
food_data=pd.read_csv('data/khaja_sets.csv')
non_veg_khaja_sets = food_data[food_data['food_pref'] == 'Non-Veg'].to_dict('records')
veg_khaja_sets = food_data[food_data['food_pref'] == 'Veg'].to_dict('records')
cafe_data = pd.read_csv('data/cafe.csv').to_dict('records')
hotels = pd.read_csv('data/hotels.csv').to_dict('records')
transportation = pd.read_csv('data/transportation.csv').to_dict("records")


def generate_food_options(budget, food_pref):
    foods = []
    food_item = random.choice(non_veg_khaja_sets if food_pref == 'Non-Vegetarian' else veg_khaja_sets)

    cafe_price_list = []

    for cafe in cafe_data:
        final_cost = food_item['cost'] * cafe['price_factor']
        cafe_price_list.append({
            "name": cafe['name'],
            "rating": cafe['rating'],
            "price": round(final_cost, 2),
            "price_factor": cafe['price_factor']
        })

    cafe_price_list.sort(key=lambda x: abs(x['price'] - budget))

    closest_cafes = cafe_price_list[:10]

    selected_cafes = random.sample(closest_cafes, 3)

    for cafe in selected_cafes:
        foods.append(
            {
                "title": food_item['name'],
                "sub_title": f"At {cafe['name']}",
                "cost": f"Rs. {cafe['price']}",
                "rating": cafe['rating'],
                "image": food_item['image'],
            }
        )

    return foods



def generate_travel_options(hours, path, budget, travel_pref):
    filtered_options = [option for option in transportation if option['type'] == ('Private' if travel_pref == 'Private' else 'Public')]
    
    for option in filtered_options:
        option['cost_diff'] = abs(option['cost'] - budget)
    
    closest_options = sorted(filtered_options, key=lambda x: x['cost_diff'])[:3]
    
    result = []
    for option in closest_options:
        result.append({
            'title': option['name'],
            'sub_title': path,
            'cost': f"Rs. {option['cost'] * hours}",
            'rating': round(random.uniform(3.8, 4.9),2),
            'image': option['image']
        })

    return result



def generate_hotel_data(budget):
    # Ensure the budget is within the allowed range
    if budget < 700:
        budget = 700
    elif budget > 15000:
        budget = 15000
    
    if budget <= 1500:
        tier = 'Budget'
        rating = round(random.uniform(3.6, 4.0), 2)
    elif budget <= 5000:
        rating = round(random.uniform(4.1, 4.4), 2)
        tier = 'Mid-Range'
    else:
        tier = 'Premium'
        rating = round(random.uniform(4.5, 5.0), 2)

    # Filter hotels by tier
    filtered_hotels = [hotel for hotel in hotels if hotel['tier'] == tier]

    result = []
    
    # Pick 3 distinct hotels for selection
    selected_hotels = random.sample(filtered_hotels, 3)  # Ensures 3 different hotels

    for selected_hotel in selected_hotels:
        # Adjust the cost based on the provided budget
        cost = round(budget + random.uniform(-200, 200), -2)  # Random cost adjustment
        result.append(
            {
                "title": selected_hotel['hotel_name'],
                "sub_title": f"{selected_hotel['tier']} hotel",
                "cost": f"Rs. {cost}",
                "rating": rating,
                "image": selected_hotel['image']
            }
        )
    return result


def expand_plan_with_details(plan, budget, food_pref, travel_pref, **kwargs):
    # Iterate over the itinerary
    total_travel_hours=0
    no_of_days = len(plan['itinerary'])
    for day in plan['itinerary']:
        for schedule in day['schedule']:
            if schedule['type'] == 'travel':
                duration = schedule.get('duration', 0)
                hours = duration  
                total_travel_hours += hours

            # Enrich details based on type
            if schedule['type'] == 'visit':
                # Retrieve detailed information about the place
                place_info = retrieve_place_details(schedule['place_id'])
                if place_info:
                    schedule.update({
                        'latlong': place_info['latlong'],
                        'activities': place_info['activities'].split(', '),
                        'rating': place_info['rating'],
                        'place_type': place_info['type'].split(', '),
                        'description': place_info['description'],
                        'image': place_info['image']
                    })

            elif schedule['type'] == 'travel':
                # Retrieve details for both origin and destination
                origin_details = retrieve_place_details(schedule['origin_id'])
                destination_details = retrieve_place_details(schedule['destination_id'])
                if origin_details:
                    schedule['origin'] = origin_details['name']
                    schedule['origin_latlong'] = origin_details['latlong']
                if destination_details:
                    schedule['destination'] = destination_details['name']
                    schedule['destination_latlong'] = destination_details['latlong']
                hours_ratio = float(schedule['duration']/total_travel_hours)
                schedule['transport'] = generate_travel_options(
                    path=f"From {schedule['origin']} to {schedule['destination']}",
                    budget=budget*0.35*hours_ratio if travel_pref == 'private' else budget*0.15*hours_ratio,
                    travel_pref=travel_pref,
                    hours=schedule['duration']
                )

            elif  schedule['type'] == 'stay':
                place_details = retrieve_place_details(schedule['place_id'])
                schedule['bookings'] = generate_hotel_data(
                    budget = budget * 0.4 / no_of_days,
                )

            else:
                place_details = retrieve_place_details(schedule['place_id'])
                schedule['food_options'] = generate_food_options(
                    budget=budget*0.45/no_of_days if travel_pref == 'private' else budget*0.65/no_of_days,
                    food_pref=food_pref,
                )
                
    return plan