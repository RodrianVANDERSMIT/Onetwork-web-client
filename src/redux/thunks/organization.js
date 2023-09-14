import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../services/api"


export const createOrganization = createAsyncThunk('organization/createOrganization', async( organizationName ,thunkApi)=>{
    
    try {
        const { data } = await api.post('/organizations',  {name: organizationName})
                
        const newOrganization = data
      
        return newOrganization
    }
    catch (error) {
        
        if (error.response.status === 409) {
            return thunkApi.rejectWithValue({ status: 409, message: 'Cette organisation existe déjà. Merci de choisir un autre nom.' });
        }  

        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la création de l'organisation." });  
    }
});
