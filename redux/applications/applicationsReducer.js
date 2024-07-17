import { createSlice } from '@reduxjs/toolkit';
import { applicationsApi } from './applicationsAPI';

const initialState = {
  applications: [],
  applicationDraft: {},
  applicationId: "",
  assessmentId: "",
  isLoading: false,
};

const Applications = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase('ADD_APPLICATION', (state, { payload }) => {
      state.applicationDraft = payload;
      
    })
    .addCase('ADD_APPLICATION_ID', (state, { payload }) => {
      state.applicationId = payload;
    })
    .addCase('ADD_ASSESSMENT_ID', (state, { payload }) => {
      state.assessmentId = payload;
    })
    .addMatcher(
      applicationsApi.endpoints.getAllApplications.matchFulfilled,
      (state, { payload }) => {
        state.applications = payload;
        state.isLoading = false;
        
      },
    );
  },
});

export default Applications.reducer;
