import { Fetch_USER_FAIL, Fetch_USER_INIT, Fetch_USER_SUCCESS } from "../actions/actionTypes"

const initialState = {
    isLoding: false,
    user: localStorage.getItem('user'),
    error: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Fetch_USER_INIT:
            return { ...state, isLoading: true }
        case Fetch_USER_SUCCESS:
            return { isLoading: false, user: action.data, error: '' }
        case Fetch_USER_FAIL:
            return { isLoading: false, user: [], error: action.error }
        default:
            return state
    }
}

export default userReducer