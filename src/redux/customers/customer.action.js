
export const SET_CUSTOMERS = 'SET_CUSTOMERS';

export const setStores = (customers) => dispatch =>
    dispatch({
        type: SET_CUSTOMERS,
        customers
    });