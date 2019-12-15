
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_IS_LOGGED_OUT = 'SET_IS_LOGGED_OUT';
export const SET_USER = 'SET_USER';

export const setUser = (user) => dispatch =>
    dispatch({
        type: SET_USER,
        user
    });

export const setIsLoggedIn = () => dispatch =>
    dispatch({
        type: SET_IS_LOGGED_IN,
    });

export const setIsLoggedOut = () => dispatch =>
    dispatch({
        type: SET_IS_LOGGED_OUT,
    });
