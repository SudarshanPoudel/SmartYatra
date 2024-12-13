import { configureStore } from "@reduxjs/toolkit";
import formReducer from './formResponseSlice'

export const store = configureStore({
    reducer : {
      formResponseData : formReducer,
    }
})