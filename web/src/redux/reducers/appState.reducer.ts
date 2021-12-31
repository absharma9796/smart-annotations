import { AppStateType, AppThemeType, CONSTANTS, __APP_STATES, __APP_THEMES } from '../actions';
import produce from 'immer';

interface InitialState {
    appLoadingState: AppStateType,
    appTheme: AppThemeType,
    sideNav: {
        collapsed: boolean
    }
}

const initialState: InitialState = {
    appLoadingState: "LOADING", 
    appTheme: "LIGHT",
    sideNav: {
        collapsed: false
    }
}

type State = typeof initialState;

const appStateReducer = (state: State = initialState, action) => 
    produce(state, draft => {
        switch(action.type) {
            case CONSTANTS.CHANGE_APP_STATE: {
                const {appState} = action.payload;
                draft.appLoadingState = __APP_STATES[appState];
                break;
            }

            case CONSTANTS.CHANGE_APP_THEME: {
                const { theme } = action.payload;
                if(__APP_THEMES[theme]) {
                    draft.appTheme = __APP_THEMES[theme];
                }
                break;
            }

            default:
                return draft;
        }
    });

export default appStateReducer;
