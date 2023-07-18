import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import feed from "../reducers/feed";
import members from "../reducers/members";
import organization from "../reducers/organization";





const reducer = {
    user,
    feed,
    members,
    organization

}
const store = configureStore({
    reducer,
    devTools: true,

})

export default store