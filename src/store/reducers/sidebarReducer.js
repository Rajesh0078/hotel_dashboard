import { Sidebar_Visible } from "../actions/actionTypes"

const initialState = {
    decision: true
}
export const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case Sidebar_Visible:
            return { ...state, decision: action.isVisible }
        default:
            return state
    }
}