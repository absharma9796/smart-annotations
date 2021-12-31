import { combineReducers } from "redux";
import appStateReducer from "./appState.reducer";
import projectsReducer from "./projects.reducer";
import userReducer from "./user.reducer";


export const rootReducer = combineReducers({
    // General Purpose Reducers
    appState: appStateReducer,
    userState: userReducer,
    // Project Related Reducers
    projectsState: projectsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;