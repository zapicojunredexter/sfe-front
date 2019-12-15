
export const SET_ORDERS = 'SET_ORDERS';

export const setStores = (orders) => dispatch =>
    dispatch({
        type: SET_ORDERS,
        orders
    });