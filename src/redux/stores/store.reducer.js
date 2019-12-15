import { SET_STORES } from './store.action';

const initialState = {
    stores: null,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_STORES:
            return {
                ...state,
                stores: action.stores,
            }
        default:
            return state;
    }
}