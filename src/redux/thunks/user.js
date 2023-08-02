import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from "../../services/api"

export const login = createAsyncThunk("users/login", async (credentials, thunkApi) => {

    try {
        const { data } = await api.post('/users/session', {email: credentials.email, password: credentials.password} )

        const user = data
        return user
    }
    catch (error) {
        console.log(error)

        if (error.response.status === 401)
            return thunkApi.rejectWithValue({
                status: 401,
                message: 'Identifiants invalides'
            })

        if (error.response.status === 403)
            return thunkApi.rejectWithValue({
                status: 403,
                message: "Votre compte est desactivée. Veuillez contacté le gérant de l'organisation."
            })

        return thunkApi.rejectWithValue({ 
            status: 500, 
            message: "Une erreur s'est produite lors de la connexion." 
        });
    }
})

export const logout = createAsyncThunk("users/logout", async ( thunkApi) => {

    try {        
        const { data } = await api.delete('/users/session', )
        
        const user = data
        return user

    }
    catch (error) {
        console.log(error)

        if (error.response.status === 401)
            return thunkApi.rejectWithValue({
                status: 401,
                message: 'Identifiants invalides'
            })

        if (error.response.status === 403)
            return thunkApi.rejectWithValue({
                status: 403,
                message: "Votre compte est desactivée. Veuillez contacté le gérant de l'organisation."
            })

        return thunkApi.rejectWithValue({ 
            status: 500, 
            message: "Une erreur s'est produite lors de la connexion." 
        });
    }
})

export const addUser = createAsyncThunk("user/addUser", async (data, thunkAPI) => {
    try {
        const organizationId = thunkAPI.getState().organization.id;

        const formData = new FormData()
        for (let [key,value] of Object.entries(data)) {
            if (key === 'profilePicture' && !value) continue
            formData.append(key, value)
        }
        formData.append('organizationId', organizationId)

        const response = await api.post('/users',formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return response
    }
    catch (error) {
        return thunkAPI.rejectWithValue({status: 500, message: "Une erreur s'est produite"});
    }
})

export const updateUser = createAsyncThunk("user/updateUser", async (data, thunkAPI) => {
    try {
        const id = thunkAPI.getState().user.id;
        const formData = new FormData()
        for (let [key,value] of Object.entries(data)) {
            if (key === 'currentPassword' && !value) continue
            if (key === 'newPassword' && !value) continue
            if (key === 'profilePicture' && !value) continue
            formData.append(key, value)
        }

        const response = api.post(`/users/${id}`,formData, {
            params: {
                _method: 'PATCH'
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return response
    }
    catch (error) {
        console.log(error)
        if (error.response.status === 422)
            return thunkAPI.rejectWithValue({
                status: 422,
                message: "L'ancien mot de passe est incorrect"
            })

        if (error.response.status === 500)
            return thunkAPI.rejectWithValue({
                status: 500,
                message: "Une erreur s'est produite"
            })
    }
})
