import * as ActionTypes from './ActionTypes'

const initialState = {
    errMess: null,
    offers: []
}
export const Offers = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_OFFERS:
            return {
                ...state,
                errMess: null,
                offers: action.payload
            }
        case ActionTypes.ADD_OFFER:
            return {
                ...state,
                errMess: null,
                offers: state.offers.concat(action.payload)
            }
        case ActionTypes.UPDATE_OFFER:
            const index = state.offers.findIndex(offer => offer._id === action.payload._id)
            return {
                offers: state.offers.map(
                    (offer, i) => i === index ? action.payload : offer
                )
            }
        case ActionTypes.DELETE_OFFER:
            return {
                ...state,
                offers: state.offers.filter(offer => offer._id !== action.payload._id)
            }
        default:
            return state
    }
}