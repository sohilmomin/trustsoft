import * as ActionTypes from './ActionTypes'
import { history } from '../App'
const baseUrl = 'http://localhost:3000'


// offers
export const addOffers = (offers) => ({
    type: ActionTypes.ADD_OFFERS,
    payload: offers
})
export const addOffer = (offer) => ({
    type: ActionTypes.ADD_OFFER,
    payload: offer
})
export const updateOffer = (offer) => ({
    type: ActionTypes.UPDATE_OFFER,
    payload: offer
})
export const removeOffer = (offer) => ({
    type: ActionTypes.DELETE_OFFER,
    payload: offer
})

export const fetchOffers = () => (dispatch) => {
    return fetch('/offers')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error("Error " + response.status + " : " + response.statusText)
                error.response = response
                throw error
            }
        }, error => {
            var errMess = new Error(error.message)
            throw errMess
        })
        .then(response => response.json())
        .then(offers => {
            dispatch(addOffers(offers))
        })
        .catch(error => {
            console.log('not fetched offers')
        })
}
export const postOffer = (product, amount, description, active) => (dispatch) => {
    var newOffer = {
        product, amount, description, active
    }
    console.log(newOffer)
    fetch('offers', {
        method: 'POST',
        body: JSON.stringify(newOffer),
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok)
                return response
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        }, error => {
            var errMess = new Error(error.message)
            throw errMess
        })
        .then(response => response.json())
        .then(offer => {
            if (!offer.message) {
                dispatch(addOffer(offer))
            }
        })
}
export const editOffer = (offerId, product, amount, description, active) => (dispatch) => {
    var newOffer = {
        product, amount, description, active
    }
    fetch('/offers/' + offerId, {
        method: 'PUT',
        body: JSON.stringify(newOffer),
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok)
                return response
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        }, error => {
            var errMess = new Error(error.message)
            throw errMess
        })
        .then(response => response.json())
        .then(offer => {
            if (!offer.message) {
                dispatch(updateOffer(offer))

            }
        })
}

export const deleteOffer = (offerId) => (dispatch) => {
    return fetch('/offers/' + offerId, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt'),
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok)
                return response
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        }, error => {
            var errMess = new Error(error.message)
            throw errMess
        })
        .then(response => response.json())
        .then(offer => {
            dispatch(removeOffer(offer))
        })
        .catch(error => {
            console.log(error)
        })
}


// User
export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
})
export const userLoginFailed = (errMess) => ({
    type: ActionTypes.USER_LOGIN_FAILED,
    payload: errMess
})
export const signUp = (name, email, password) => (dispatch) => {
    const newUser = {
        name,
        email,
        password
    }
    return fetch('users/signup', {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(newUser)
    })
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error("Error " + response.status + " : " + response.statusText)
                error.response = response
                throw error
            }
        }, error => {
            var errMess = new Error(error.message)
            throw errMess
        })
        .then(response => response.json())
        .then(res => {
            history.push('/signin')
        })
        .catch(error => {
            dispatch(userLoginFailed(error.message))
        })
}

export const signIn = (name, password) => (dispatch) => {
    const loginUser = {
        name,
        password
    }
    return fetch('users/signin', {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(loginUser)
    })
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error("Error " + response.status + " : " + response.statusText)
                error.response = response
                throw error
            }
        }, error => {
            var errMess = new Error(error.message)
            throw errMess
        })
        .then(response => response.json())
        .then(user => {
            localStorage.setItem("jwt", user.token)
            dispatch(addUser(user))
            history.push('/')
        })
        .catch(error => {
            dispatch(userLoginFailed(error.message))
        })
}

export const clearUser = () => ({
    type: ActionTypes.CLEAR_USER
})
export const logout = () => (dispatch) => {
    localStorage.clear()
    dispatch(clearUser())
}
