import { apiCall } from '../helper/apiCall';  

const setAddAccount = (accountInfo, tran) => ({
    type: "ADD_ACCOUNT", 
    payload: {accountInfo, tran}
});

export const addAccount = (accountInfo, userId) => {  
    return async (dispatch) =>{
        let data = await apiCall({
            url: "accounts/" + userId, 
            method: "POST",
            body: JSON.stringify(accountInfo)
        });
        if(data.synced > 0){ 
            dispatch(setAddAccount(data.account, data.tran));
        }
    }
} 

const setDeleteAccount = (id) => ({
    type: "DELETE_ACCOUNT",
    payload: {id}
});

export const deleteAccount = (id, userId) => { 
    return async (dispatch) =>{
        let data = await apiCall({
            url: "accounts/" + userId, 
            method: "DELETE",
            body: JSON.stringify({account: id})
        });
        if(data.synced > 0){
            dispatch(setDeleteAccount(id));
        }
    }
}; 

const setAccounts = (accountData) =>({
    type: "LOAD_ACCOUNTS",
    payload: { accounts: accountData } 
}); 

export const loadAccounts = (userId) =>{ 
    return async (dispatch) => { 
        let data = await apiCall({
            url: "accounts/" + userId
        }); 
        let useData;
        if( localStorage.getItem("localAccounts") === null ){ 
            useData = data.accounts; 
        }else{
            let localData = JSON.parse(localStorage.getItem("localAccounts"));
            useData = localData.synced > data.synced ? localData.accounts : data.accounts;
        }  
        dispatch(setAccounts(useData));
    } 
}