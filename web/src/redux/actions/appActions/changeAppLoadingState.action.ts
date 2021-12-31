import { AppStateType, CONSTANTS } from '../index';

export const changeAppLoadingState__action = (appState: AppStateType) => {
    return {
        type: CONSTANTS.CHANGE_APP_STATE,
        payload: { appState }
    }
}