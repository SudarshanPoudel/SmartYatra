import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    responseData : [],
}

const formResponseSlice = createSlice({
     name : 'formResponse',
     initialState,
     reducers : {
        setformResponse : (state,action) => {
           state.responseData = action.payload ;
        }
     }
});

export const {setformResponse} = formResponseSlice.actions;
export default formResponseSlice.reducer;