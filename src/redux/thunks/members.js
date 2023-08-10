import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from "../../services/api"

export const fetchMembers = createAsyncThunk("members/fetchMembers", async (organizationId, thunkApi) => {
    try {
        
        const { data : members} = await api(`/organizations/${organizationId}/users`)
        
        return members
                
    }
    catch (error) {
        
        if (error.response.status === 404) {
            return thunkApi.rejectWithValue({status: 404, message : "Il n'y a aucun membre dans cette organisation"});
        }
       
        return thunkApi.rejectWithValue({status: 500, message: "Une erreur s'est produite"});
    }
})

export const updateMemberStatus = createAsyncThunk("user/updateMemberStatus", async ({ id, disabled }, thunkAPI) => {
    try {
        const members = thunkAPI.getState().members;
        const {list} = members
        const updatedList = list.map((member) => {
            if (member.id === id) {
                return { ...member, disabled: !disabled };
            }
            return member;
        });
        if (list === updatedList) {
            return thunkAPI.rejectWithValue({ status: 404, message: "Il n'y a aucun membre a mettre a jour" });
        }
        return updatedList;
    }
    catch(error) {
        return thunkAPI.rejectWithValue({status: 500, message: "Une erreur s'est produite"});
    }
})
