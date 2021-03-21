import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { User } from './userReducer'
import { Offers } from './offerReducer'
import logger from 'redux-logger'
export const configureStore = () => {
    const store = createStore(
        combineReducers({
            offers: Offers,
            user: User,
        }),
        applyMiddleware(thunk, logger)
    )
    return store
}