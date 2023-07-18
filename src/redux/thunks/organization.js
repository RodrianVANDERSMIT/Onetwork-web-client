import { createAsyncThunk } from "@reduxjs/toolkit"
import organizations from "../../data/Organization.js"


export const newOrganization = createAsyncThunk('organization/create', async(organizationName, thunkApi) => {
    try { 
        console.log(organizations)
        const exist = organizations.some(({name}) => name ===organizationName)  
        
        if (exist) {
            return thunkApi.rejectWithValue({ status: 409, message: 'Le nom de l\'organisation existe déjà.' });
        }  
        return organizationName;
    }
    catch (error) {
        return thunkApi.rejectWithValue({ status: 500, message: 'Une erreur s\'est produite lors de la création de l\'organisation.' });
    }
})
