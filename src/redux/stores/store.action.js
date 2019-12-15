
export const SET_STORES = 'SET_STORES';

export const setStores = (stores) => dispatch =>
    dispatch({
        type: SET_STORES,
        stores
    });