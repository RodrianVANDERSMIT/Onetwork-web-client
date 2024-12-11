import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import errorPage from "../reducers/errorPage"
import feed from "../reducers/feed";



const reducer = {
    user,
    errorPage,
    feed
}

const store = configureStore({
    reducer,
    devTools: true
})

export default store
