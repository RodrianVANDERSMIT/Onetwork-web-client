import { createAsyncThunk } from '@reduxjs/toolkit'
import users from '../../data/AppUser'

export const fetchMembers = createAsyncThunk("members/fetchMembers", async (organization, thunkAPI) => {
    try {
        const members = users.filter(({organizationId}) => organizationId === organization )

        if (members) {
            return members
        }
        else {
            return thunkAPI.rejectWithValue({status: 404, message : "Il n'y a aucun membre dans cette organisation"});
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue({status: 500, message: "Une erreur s'est produite"});
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
        console.log(updatedList);
        if (list === updatedList) {
            return thunkAPI.rejectWithValue({ status: 404, message: "Il n'y a aucun membre a mettre a jour" });
        }
        return updatedList;
    }
    catch(error) {
        return thunkAPI.rejectWithValue({status: 500, message: "Une erreur s'est produite"});
    }
})
