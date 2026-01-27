import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const surveySlice = createSlice({
    name: "surveys",
    initialState,
    reducers: {
        setSurveys(state, action) {
            return Array.isArray(action.payload) ? action.payload : state;
        },
        clearSurveys() {
            return [];
        },
    },
});

export const { setSurveys, clearSurveys } = surveySlice.actions;
export default surveySlice.reducer;
