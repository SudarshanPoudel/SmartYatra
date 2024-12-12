# Run this file once to initialize csv data
import pandas as pd
from data import detailed_desc, store_chunks

# Read csv
places_df = pd.read_csv("data/places.csv")
places_df['description_llm'] = places_df.apply(
    lambda row: detailed_desc(row['id'],row['name'], row['description'],  row['location'], row['longitude'], row['latitude'], row['type'], row['activities'], row['required_time']),
    axis=1
)

print("Storing places started...")
for index, row in places_df.iterrows():
    row_dict = row.to_dict()  
    store_chunks(row_dict)
    if((index+1)%10 == 0):
        print(f"{index+1} Places added...")
