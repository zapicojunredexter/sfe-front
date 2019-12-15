import { SET_IS_LOGGED_IN, SET_IS_LOGGED_OUT, SET_USER } from './user.action';

const initialState = {
    isLoggedIn: false,
    user: null,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user,
            }
        case SET_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: true,
            }
        case SET_IS_LOGGED_OUT: {
            localStorage.clear();
            return {
                ...state,
                isLoggedIn: false,
            }
        }
        default:
            return state;
    }
}