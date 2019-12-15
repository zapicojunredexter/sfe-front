import { SET_CUSTOMERS } from './customer.action';

const initialState = {
    customers: null,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CUSTOMERS:
            return {
                ...state,
                customers: action.customers,
            }
        default:
            return state;
    }
}