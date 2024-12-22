import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch allplaces
export const fetchAllPlaces = createAsyncThunk('apiFetch/fetchAllPlaces', async () => {
  const response = await axios.get('all-places');
  return response.data;
});

// Async thunk to fetch allActivities
export const fetchAllActivities = createAsyncThunk('apiFetch/fetchAllActivities', async () => {
  const response = await axios.get('all-activities');
  return response.data;
});

// Async thunk to fetch allPlacesType
export const fetchAllPlaceType = createAsyncThunk('apiFetch/fetchAllPlaceType', async () => {
  const response = await axios.get('all-placetypes');
  return response.data;
});

const initialState = {
  allPlaces : [],
  allActivities : [],
  allPlaceTypes : [],
  status: 'idle',
  error: null,
}

// Creating Slices
const apiFetchSlice = createSlice({
  name: 'apiFetch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      // Handle fetchAllPlaces
    builder
      .addCase(fetchAllPlaces.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPlaces.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allPlaces = action.payload;
      })
      .addCase(fetchAllPlaces.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

     // Handle fetchAllActivities
    builder
    .addCase(fetchAllActivities.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchAllActivities.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.allActivities = action.payload;
    })
    .addCase(fetchAllActivities.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // Handle fetchplaceTYpe
    builder
    .addCase(fetchAllPlaceType.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchAllPlaceType.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.allPlaceTypes = action.payload;
    })
    .addCase(fetchAllPlaceType.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default apiFetchSlice.reducer;
