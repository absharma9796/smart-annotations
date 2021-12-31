import { User } from '@dataTypes/user.type';
import { CONSTANTS } from './index';

export const setUser__action = (user: User) => {
    return {
        type: CONSTANTS.SET_USER,
        payload: { user }
    }
}

export const setUserDetail__action = (key: string, value: any) => {
    return {
        type: CONSTANTS.SET_USER_DETAILS,
        payload: {key, value}
    }
}