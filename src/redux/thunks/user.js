import { createAsyncThunk } from '@reduxjs/toolkit'
import  users  from "../../data/AppUser"
import { api } from "../../services/api"

export const login = createAsyncThunk("users/login", async (credentials, thunkApi) => {
   
    try { 
        
        const { data } = await api.post('/users/1/session', {email: credentials.email, password: credentials.password} )
        
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
        
        const { data } = await api.delete('/users/1/session', )
        
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
        if (!data.currentPassword) {
            delete data.currentPassword
            delete data.newPassword
        }
        // TODO: Remove the else part when the server is ready
        else {
            const user = thunkAPI.getState().user;

            const isValid = users.some(({email, password}) =>
                email === user.email &&
                password === data.currentPassword
            );

            if (!isValid) {
                return thunkAPI.rejectWithValue({status: 422, message: "L'ancien mot de passe est incorrect"});
            }
            delete data.currentPassword;
            delete data.newPassword;
        }

        // TODO remove fix before Api connect
        // Temporary profile_picture fix to remove before Api connect
        data.profilePicture = "https://randomuser.me/api/portraits/women/33.jpg"
        // End Temporary profile_picture fix
        return data
    }
    catch (error) {
        return thunkAPI.rejectWithValue({status: 500, message: "Une erreur s'est produite"});
    }
})
