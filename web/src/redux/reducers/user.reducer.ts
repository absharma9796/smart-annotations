import { CONSTANTS } from '../actions';
import produce from 'immer';
import { User } from 'src/dataTypes/user.type';
import logger from 'src/utils/logger';

type InitialState = {
    user: User
}

const initialState: InitialState = {
    user: {
        id: null,
        name: null,
        member_since: null,
        last_active: null,
        score: null,
        role: null,
        email: null,
        annotated_count: null
    }
}

const userReducer = (state: InitialState = initialState, action) => 
produce(state, draft => {
    switch(action.type) {

        case CONSTANTS.SET_USER: {
            const { user } = action.payload;
            if(!user?.id ) {
                logger.error(['SET_USER'],'Invalid User');
                break;
            }
            draft.user = user;
            break;
        }

        case CONSTANTS.SET_USER_DETAILS: {
            const { key, value } = action.payload;
            if(!Object.keys(initialState.user).includes(key)) {
                logger.error("userReducer: ", "Key not found");
                break;
            }
            draft.user[key] = value;
            break;
        }

        default:
            return draft;
    }
})

export default userReducer;