import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import feed from "../reducers/feed";
import members from "../reducers/members";
import organization from "../reducers/organization";
import {initialState as initialUser} from "../reducers/user"



const reducer = {
    user,
    feed,
    members,
    organization
}

let preloadedUser =  initialUser

 
if (localStorage.getItem('user')) {
    preloadedUser = JSON.parse(localStorage.getItem('user'))
}

const store = configureStore({
    reducer,
    devTools: true,
    preloadedState: {
        user: preloadedUser
    }
})

export default store