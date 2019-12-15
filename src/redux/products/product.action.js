
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const setProducts = (products) => dispatch =>
    dispatch({
        type: SET_PRODUCTS,
        products
    });