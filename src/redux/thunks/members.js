import { createAsyncThunk } from '@reduxjs/toolkit'

export const updateMemberStatus = createAsyncThunk("user/updateMemberStatus", async ({ id, disabled }, thunkAPI) => {
    try {
        console.log("In tha thunk - update status")
        const updatedMemberStatus = { id, disabled: !disabled }

        return updatedMemberStatus
    }
    catch(error) {
        return thunkAPI.rejectWithValue({status: 500, message: "Une erreur s'est produite"});
    }
})