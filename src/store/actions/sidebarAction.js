import { Sidebar_Visible } from "./actionTypes";

export const sideBarAction = (data) => {
    return {
        type: Sidebar_Visible,
        isVisible: data
    }
}