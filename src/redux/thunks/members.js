import { createAsyncThunk } from '@reduxjs/toolkit'
import { api, fetchCsrfCookie } from "../../services/api"

export const fetchMembers = createAsyncThunk("members/fetchMembers", async (organizationId, thunkApi) => {
    try {
        
        const { data : members} = await api(`/organizations/${organizationId}/users`)
        
        return members
                
    }
    catch (error) {
        
        if (error.response.status === 404) {
            return thunkApi.rejectWithValue({status: error.response.status, message : "Il n'y a aucun membre dans cette organisation"});
        }
       
        return thunkApi.rejectWithValue({status: error.response.status, message: "Une erreur s'est produite"});
    }
})

export const updateMemberStatus = createAsyncThunk("members/updateMemberStatus", async ({ id, disabled }, thunkAPI) => {
    try {
        await fetchCsrfCookie()

        const response = await api.patch(`/users/${id}`,{disabled: disabled}, )
       
        const updatedMember = response.data
        
        return updatedMember;
    }
    catch(error) {   
        
        if (error.response.status === 404){
            return thunkAPI.rejectWithValue({status: error.response.status, message: "Ce membre n'existe pas"})
        }

        return thunkAPI.rejectWithValue({status: error.response.status, message: "Une erreur s'est produite"});
               
    }
})
