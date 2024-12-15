import { configureStore } from "@reduxjs/toolkit";
import formReducer from './formResponseSlice'
import fetchapiReducer from './apiFetchSlice'

export const store = configureStore({
    reducer : {
      formResponseData : formReducer,
      fetchApi :fetchapiReducer,
    }
})