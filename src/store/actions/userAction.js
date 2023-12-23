import { Fetch_USER_SUCCESS } from "./actionTypes"

// export const fetchUserInit = () => {
//     return {
//         type: Fetch_USER_INIT
//     }
// }
export const fetchUserSuccess = (users) => {
    return {
        type: Fetch_USER_SUCCESS,
        data: users
    }
}
// export const fetchUserFail = (error) => {
//     return {
//         type: Fetch_USER_FAIL,
//         error: error
//     }
// }

