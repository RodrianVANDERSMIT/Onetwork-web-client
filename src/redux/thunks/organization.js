import { createAsyncThunk } from "@reduxjs/toolkit"
import organizations from "../../data/Organization.js"


export const validateOrganization = createAsyncThunk('organization/validateOrganization', async(organizationName, thunkApi) => {
    try { 
        
        const exist = organizations.some(({name}) => name ===organizationName)  
        
        if (exist) {
            return thunkApi.rejectWithValue({ status: 409, message: 'Cette organisation existe déjà. Merci de choisir un autre nom.' });
        }  
        return organizationName;
    }
    catch (error) {
        return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de la création de l'organisation." });
    }
});



export const createOrganization = createAsyncThunk('organization/createOrganization', async( organizationName ,thunkApi)=>{
    
    try {
        const exist = organizations.some(({name}) => name ===organizationName)  
        
        if (exist) {
            return thunkApi.rejectWithValue({ status: 409, message: 'Cette organisation existe déjà. Merci de choisir un autre nom.' });
        }  

        const  newOrganization = {
            id: organizations.lenght +1,
            name: organizationName
        };
        
        return newOrganization
    }
    catch (error) {
        return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de la création de l'organisation." });  
    }
});



export const fetchOrganization = createAsyncThunk('organization/fetchOrganization', async( organizationId , thunkApi) =>{

    try {
        const organization = organizations.find(({id}) => id === organizationId)
        
        if (organization) {
            return organization 
        }
        else {
            return thunkApi.rejectWithValue({status: 404, message : "l'organisation avec cette id n'a pas été trouvée."});
        }
        
    }
    catch (error) {
        return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de la recupération de l'organisation." });  
    }
})


