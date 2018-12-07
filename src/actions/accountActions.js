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
            body: JSON.stringify(accountInfo),
            applyAuth: true
        });
        if(!data.error){ 
            dispatch(setAddAccount(data.account, data.tran));
        }else{
            dispatch({type: "ERROR", payload: data.error.error })
        }
    }
} 

const setDeleteAccount = (id) => ({
    type: "DELETE_ACCOUNT",
    payload: {id}
});

export const deleteAccount = (id, userId) => { 
    return async (dispatch) =>{
        dispatch({type: "SET_MESSAGE", payload:{message: "Deleting account"}});
        let data = await apiCall({
            url: "accounts/" + userId, 
            method: "DELETE",
            body: JSON.stringify({account: id}),
            applyAuth: true
        });
        if(!data.error){
            dispatch({type: "SET_MESSAGE", payload:{message: ""}});
            dispatch(setDeleteAccount(id));
        }else{
            dispatch({type: "ERROR", payload: data.error.error })
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
            url: `accounts/${userId}`,
            applyAuth: true
        }); 
        let useData = data.accounts;  
        if(!data.error){
            dispatch(setAccounts(useData));
        }else{
            dispatch({type: "ERROR", payload: data.error.error });
        } 
    } 
}