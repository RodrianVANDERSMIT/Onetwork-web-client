import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../services/api"



export const validateOrganization = createAsyncThunk('organization/validateOrganization', async(organizationName, thunkApi) => {
    try { 
        await api('/organizations/validation', {params: {name: organizationName}})

        return organizationName;
    }
    catch (error) {
        console.log(error)
        if (error.response.status === 409) {
            return thunkApi.rejectWithValue({ status: 409 , message: 'Cette organisation existe déjà. Merci de choisir un autre nom.' });
        }  
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la création de l'organisation." });
    }
});



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



export const fetchOrganization = createAsyncThunk('organization/fetchOrganization', async( organizationId , thunkApi) =>{
    
    try {
        const { data } = await api(`/organizations/${organizationId}`)
                
        const organization = data

        return organization
    }
    catch (error) { 
        
        if (error.response.status === 404) {
            return thunkApi.rejectWithValue({status: 404, message : "l'organisation avec cette id n'a pas été trouvée."});
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la recupération de l'organisation." });  
    }
})


