import { combineReducers } from "redux";
import appStateReducer from "./appState.reducer";
import datapointsReducer from "./datapoints.reducer";
import datasetsReducer from "./datasets.reducer";
import projectsReducer from "./projects.reducer";
import userReducer from "./user.reducer";


export const rootReducer = combineReducers({
    // General Purpose Reducers
    appState: appStateReducer,
    userState: userReducer,
    // Project Related Reducers
    projectsState: projectsReducer,
    // Dataset Related Reducers
    datasetsState: datasetsReducer,
    // DataPoint Related Reducers
    datapointsState: datapointsReducer
});

export type RootState = ReturnType<typeof rootReducer>;