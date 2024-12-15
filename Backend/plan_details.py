import random
from data import retrieve_place_details

# data
# Vegetarian Khaja Sets
veg_khaja_sets = [
    {"name": "Newari Veg Khaja Set", "cost": 350},
    {"name": "Puri Tarkari Set", "cost": 250},
    {"name": "Aalu Nimki Set", "cost": 180},
    {"name": "Vegetarian Thali", "cost": 300},
    {"name": "Chana Masala Thali", "cost": 280},
    {"name": "Vegetable Pakora Set", "cost": 150},
    {"name": "Momo Veg Set", "cost": 250},
    {"name": "Vegetable Fried Rice Set", "cost": 220},
    {"name": "Chole Bhature Set", "cost": 290},
    {"name": "Veg Roll Set", "cost": 200},
    {"name": "Daal Bhat Veg Set", "cost": 270}
]

# Non-Vegetarian Khaja Sets
non_veg_khaja_sets = [
    {"name": "Newari Non-Veg Khaja Set", "cost": 450},
    {"name": "Meat Puri Tarkari Set", "cost": 350},
    {"name": "Rice and Chicken Curry Set", "cost": 400},
    {"name": "Chatpate Sukuti Set", "cost": 350},
    {"name": "Mutton Sekuwa Set", "cost": 500},
    {"name": "Chicken Momo Set", "cost": 300},
    {"name": "Beef Bhutuwa Set", "cost": 420},
    {"name": "Pork Curry Set", "cost": 450},
    {"name": "Chicken Fried Rice Set", "cost": 320},
    {"name": "Fish Curry Set", "cost": 380},
    {"name": "Egg Curry Set", "cost": 230}
]

# Example cafe names (you can add more as needed)
cafe_names = [
    "Sundar Cafe", "Himalaya Bistro", "Everest Lounge", "Garden Delights", "Sunrise Cafe",
    "The Green Leaf", "Pahadi Cafe", "Mountain View Cafe", "Kaffe Nirvana", "The Rustic Spoon",
    "Royal Taste", "Nepal Coffee House", "Chai Sathi", "The Aroma", "The Cozy Corner",
    "Taste of Kathmandu", "Momo House", "Spice Garden", "Heritage Cafe", "Bistro Bliss",
    "The Himalayan Delight", "The Local Eatery", "Café Shanti", "Cafe Nirvana", "The Serene Spoon",
    "Nepali Bites", "Urban Palate", "Café Kathmandu", "Tranquil Tastes", "Chiya Ghar"
]

hotel_names = [
    # Budget Tier
    "Budget Inn",
    "Simple Stay",
    "Economy Lodge",
    "Urban Budget Hotel",
    "Easy Rest Hotel",
    "City View Inn",
    "Traveler's Spot",
    "Himalayan Stay",
    "Heritage Guesthouse",
    "Valley Lodge",
    
    # Mid-Range Tier
    "Comfort Stay",
    "Green View Hotel",
    "City Escape",
    "Mountain Retreat",
    "Royal Comforts",
    "Elite Stay",
    "Luxury Nest",
    "The Serenity Hotel",
    "Skyline View Hotel",
    "Majestic Retreat",
    "Himalayan Horizon",
    "Blue Sky Inn",
    "Tranquil Heights",
    "Lakeside Inn",
    "Vista Lodge",
    "Urban Comfort",
    "Nepal's Nest",
    "Everest Base Stay",
    "Kathmandu Kottage",
    "Peaceful Abode",

    # Premium Tier
    "Platinum Stay",
    "Infinity Hotel",
    "Diamond Resort",
    "Grand Royale",
    "The Royal Crown",
    "Golden Peak Hotel",
    "Luxury Valley Retreat",
    "Sky High Resort",
    "Ethereal Suites",
    "Paradise Heights",
]

def generate_food_options(budget, food_pref, lat, long):
    foods = []
    for _ in range(3):  # Generate 3 food options
        food_item = random.choice(non_veg_khaja_sets if food_pref == 'Non-Vegetarian' else veg_khaja_sets)
        hotel_name = random.choice(cafe_names)
        rating = round(random.uniform(3.5, 4.5), 1)  # Generate rating between 3.5 to 4.5

        # Adjust the location slightly to simulate nearby hotels
        adjusted_lat = round(lat + random.uniform(-0.005, 0.005), 6)
        adjusted_long = round(long + random.uniform(-0.005, 0.005), 6)

        foods.append(
            {
                "food": food_item['name'],
                "rating": rating,
                "cost": food_item['cost'],
                "hotel": {
                    "name": hotel_name,
                    "lat": adjusted_lat,
                    "long": adjusted_long
                }
            }
        )

    return foods

# Helper function to divide travel cost based on duration
def generate_travel_options(hours_ratio, budget, travel_pref):
    options_public = ['Public Bus', 'Deluxe Bus', 'Micro', 'Jeep', 'Tourist Only Bus']
    options_private = ['Car (Rental)', 'Taxi', 'Bike (Rental)', 'Jeep (Rental)']
    result =[]
    factor = [1, 0.9, 1.2]
    for f in factor:
        result.append({
            'type': random.choice(options_private) if travel_pref == 'Private' else random.choice(options_public),
            'cost': round(budget * hours_ratio * f/20)*20,
            'rating': round(random.uniform(35, 45) * f) / 10
        })
    return result
        


def generate_ratings_based_on_budget(budget, tiers=[700, 2000]):
    if budget < tiers[0]:
        return round(random.uniform(3.5, 4.0), 1)
    elif budget <= tiers[1]:
        return round(random.uniform(4.0, 4.5), 1)
    else:
        return round(random.uniform(4.5, 5.0), 1)

def generate_hotel_data(budget, lat, long):
    if budget < 500:
        budget = 500
    elif budget > 10000:
        budget = 10000

    if budget < 1000:
        hotels = hotel_names[0:10]
    elif budget < 3000:
        hotels = hotel_names[10:30]
    else:
        hotels = hotel_names[30:]

    result = []
    for _ in range(3):
        cost = round((budget + random.uniform(-100, 100))/20)*20
        rating = generate_ratings_based_on_budget(cost, [700, 2000])
        
        adjusted_lat = round(lat + random.uniform(-0.005, 0.005), 6)
        adjusted_long = round(long + random.uniform(-0.005, 0.005), 6)

        result.append(
            {
                "hotel": random.choice(hotels),
                "rating": rating,
                "cost": cost,
                "location": {
                    "lat": adjusted_lat,
                    "long": adjusted_long
                }
            }
        )

    return result


def expand_plan_with_details(plan, budget, food_pref, travel_pref):
    # Iterate over the itinerary
    total_travel_hours=0
    no_of_days = len(plan['itinerary'])
    for day in plan['itinerary']:
        for schedule in day['schedule']:
            if schedule['type'] == 'travel':
                duration = schedule.get('duration', '0 hours')
                hours = duration  
                total_travel_hours += hours

            # Enrich details based on type
            if schedule['type'] == 'visit':
                # Retrieve detailed information about the place
                place_info = retrieve_place_details(schedule['place_id'])
                if place_info:
                    schedule.update({
                        'image': place_info['image'],
                        'latitude': place_info['latitude'],
                        'longitude': place_info['longitude'],
                        'activities': place_info['activities'].split(', '),
                        'rating': place_info['rating'],
                        'place_type': place_info['type'].split(', '),
                        'description': place_info['description'],
                    })

            elif schedule['type'] == 'travel':
                # Retrieve details for both origin and destination
                origin_details = retrieve_place_details(schedule['origin_id'])
                destination_details = retrieve_place_details(schedule['destination_id'])
                if origin_details:
                    schedule['origin'] = origin_details['name']
                    schedule['origin_latitude'] = origin_details['latitude']
                    schedule['origin_longitude'] = origin_details['longitude']
                    schedule['origin_image'] = origin_details['image']
                if destination_details:
                    schedule['destination'] = destination_details['name']
                    schedule['destination_latitude'] = destination_details['latitude']
                    schedule['destination_longitude'] = destination_details['longitude']
                    schedule['destination_image'] = destination_details['image']
                schedule['transport'] = generate_travel_options(
                    hours_ratio = schedule['duration']/total_travel_hours,
                    budget=budget*0.4 if travel_pref == 'private' else budget*0.3,
                    travel_pref=travel_pref
                )

            elif  schedule['type'] == 'stay':
                place_details = retrieve_place_details(schedule['place_id'])
                if place_details:
                    place_info = place_details
                    schedule.update({
                        'latitude': place_info['latitude'],
                        'longitude': place_info['longitude']
                    })
                schedule['bookings'] = generate_hotel_data(
                    budget = budget * 0.4 / no_of_days,
                    lat= place_info['latitude'],
                    long= place_info['longitude']
                )

            else:
                place_details = retrieve_place_details(schedule['place_id'])
                if place_details:
                    place_info = place_details
                    schedule.update({
                        'latitude': place_info['latitude'],
                        'longitude': place_info['longitude']
                    })
                schedule['food_options'] = generate_food_options(
                    budget= budget * 0.2 / no_of_days,
                    food_pref=food_pref,
                    lat= place_info['latitude'],
                    long= place_info['longitude']
                )
                
    return plan