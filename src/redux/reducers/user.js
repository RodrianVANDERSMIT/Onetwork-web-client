import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    id: null,
    name: "",
    surname: "",
    email: "",
    job: "",
    role: "",
    profilPicture: "",
    disabled: false,
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => { 

        //thunks

    },
})


export default slice.reducer