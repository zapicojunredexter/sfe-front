
export const SET_REVIEWS = 'SET_REVIEWS';

export const setStores = (reviews) => dispatch =>
    dispatch({
        type: SET_REVIEWS,
        reviews
    });