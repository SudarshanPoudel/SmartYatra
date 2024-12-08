from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pandas as pd

from plans import generate_plan, edit_plan
from data import retrieve_place_details, retrieve_all_places, store_chunks, delete_chunk

app = FastAPI()

# Pydantic model to handle the incoming request body
class TourPlanRequest(BaseModel):
    user_location: str = 'Bharatpur'
    tour_type: str = 'Adventure'
    no_of_days: int = 3
    priority_place_types:str = ''
    priority_activities:str = ''
    priority_places:str = ''
    extra_desc:str = ''

class TourEditRequest(BaseModel):
    current_plan: str
    user_edit_desc: str
    no_of_days: int

class PlaceAddRequest(BaseModel):
    name:str
    desc:str
    location:str
    type:str
    lon:float
    lat:float
    required_time:int
    activities:str
    image:str
    


# POST endpoint to generate a tour plan
@app.post("/generate-plan")
def generate_trip_plan(request: TourPlanRequest):
    params = request.model_dump()
    plan = generate_plan(**params)
    return JSONResponse(content=plan)

# POST endpoint to edit a tour plan
@app.post("/edit-plan")
def edit_trip_plan(request: TourEditRequest):
    params = request.model_dump()
    plan = edit_plan(**params)
    return JSONResponse(content=plan)

# POST endpoint to add place
@app.post("/add-place")
def add_place(request: PlaceAddRequest):
    params = request.model_dump()
    uuid = store_chunks(params)
    return uuid

# GET endpoint to delete place
@app.get("/delete-place/{place_id}")
def add_place(place_id):
    return delete_chunk(place_id)


# GET endpoint to give information of all places
@app.get("/all-places")
def all_place():
    return retrieve_all_places()
    

# GET endpoint to give information of 1 single place
@app.get("/place/{place_id}")
def place(place_id):
    plan = retrieve_place_details(int(place_id))
    return JSONResponse(content=plan)


# GET endpoint to give information of all activities
@app.get("/all-activities")
def activities():
    data = pd.read_csv('data/activities.csv')
    data.fillna('None', inplace=True)
    return JSONResponse(content=data.to_dict('records'))


# GET endpoint to give information of all activities
@app.get("/all-placetypes")
def activities():
    data = pd.read_csv('data/place_types.csv')
    data.fillna('None', inplace=True)
    return JSONResponse(content=data.to_dict('records'))