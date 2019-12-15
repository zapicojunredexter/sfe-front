import { SET_PRODUCTS } from './product.action';

const initialState = {
    products: null,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products,
            }
        default:
            return state;
    }
}