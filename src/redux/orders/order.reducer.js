import { SET_ORDERS } from './order.action';

const initialState = {
    orders: null,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders,
            }
        default:
            return state;
    }
}