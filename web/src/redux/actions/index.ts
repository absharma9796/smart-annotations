export * from './appActions/changeAppLoadingState.action';
export * from './user.action';
export * from './projects.action';
export * from './datasets.action';
export * from './datapoints.action';

//Global App States
export type AppStateType = keyof typeof __APP_STATES;
export const __APP_STATES = Object.freeze({
    LOADING: 'LOADING',
    LOADED: 'LOADED',
});

//Global Theme States
export type AppThemeType = 'LIGHT' | 'DARK';
export const __APP_THEMES = Object.freeze({
    LIGHT: 'LIGHT',
    DARK: 'DARK'
})


//Action types
export const CONSTANTS = Object.freeze({
    CHANGE_APP_STATE: 'CHANGE_APP_STATE',
    CHANGE_APP_THEME: 'CHANGE_APP_THEME',
    SET_USER: 'SET_USER',
    SET_USER_DETAILS: 'SET_USER_DETAILS',
    //Project Related Actions
    PROJECTS__SET_PROJECTS: 'PROJECTS__SET_PROJECTS',
    //Dataset Related Actions
    DATASETS__SET_DATASETS: "DATASETS__SET_DATASETS",
    //Datapoint Related Actions
    DATAPOINTS__SET_DATAPOINTS: "DATAPOINTS__SET_DATAPOINTS"
});