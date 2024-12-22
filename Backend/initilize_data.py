# Script to add initial places

from data import store_place
import pandas as pd

df = pd.read_csv('data/places.csv')

print("Storing data about places started...")
for i, row in df.iterrows():
    store_place(row.to_dict())
    if((i+1)%10 == 0):
        print(f"Added {i+1} Places")
