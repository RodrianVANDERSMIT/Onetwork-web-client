import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import feed from "../reducers/feed";
import members from "../reducers/members";



const reducer = {
    user,
    feed,
    members
}

const store = configureStore({
    reducer,
    devTools: true
})

export default store
