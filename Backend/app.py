from fastapi import FastAPI
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
import pandas as pd
from pathlib import Path

from plans import generate_plan, edit_plan
from data import retrieve_place_details, retrieve_all_places
from plan_details import expand_plan_with_details
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]
app.state.plan_data = None
app.state.latest_plan = None

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model to handle the incoming request body
class TourPlanRequest(BaseModel):
    user_location: str
    starting_point: str
    user_lat: float
    user_long: float
    tour_type: str
    no_of_days: int
    budget:int
    priority_place_types:str = ''
    priority_activities:str = ''
    priority_places:str = ''
    extra_desc:str = ''
    food_pref:str='non-veg'
    travel_pref:str='private'
    currency:str='npr'

class TourEditRequest(BaseModel):
    user_edit_desc: str

# POST endpoint to generate a tour plan
@app.post("/generate-plan")
def generate_trip_plan(request: TourPlanRequest):
    params = request.model_dump()
    app.state.plan_data = params
    plan = generate_plan(**params)
    app.state.latest_plan = plan
    detailed_plan = expand_plan_with_details(
        plan=plan,
        **params
    )
    return JSONResponse(content=detailed_plan)

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


IMAGE_DIR = Path("images")
IMAGE_DIR.mkdir(exist_ok=True) 

@app.get("/images/{image_name}")
def get_image(image_name: str):
    file_path = IMAGE_DIR / image_name  
    if file_path.exists() and file_path.is_file(): 
        return FileResponse(file_path) 
    return {"error": "Image not found"}  

# POST endpoint to edit a tour plan
@app.post("/edit-plan")
def edit_trip_plan(request: TourEditRequest):
    params = request.model_dump()
    if app.state.latest_plan is not None:
        plan = edit_plan(current_plan=app.state.latest_plan, **params)
        detailed_plan = expand_plan_with_details(plan, **get_plan_data())
        return JSONResponse(content=detailed_plan)
    else:
        return JSONResponse(content={"Error": "NO previous plan"})



def get_plan_data():
    return app.state.plan_data


def get_latest_plan():
    return app.state.latest_plan