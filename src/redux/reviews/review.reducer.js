import { SET_REVIEWS } from './review.action';

const initialState = {
    reviews: null,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWS:
            return {
                ...state,
                reviews: action.reviews,
            }
        default:
            return state;
    }
}