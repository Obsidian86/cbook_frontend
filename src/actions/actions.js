import { apiCall } from '../helper/apiCall'; 
 
const setLoginUser = (userId) => { 
    return{ type: "LOGIN_USER", payload: {userId} }
};
export const loginUser = (userInfo) => {  
    return async (dispatch) =>{ 
        let data = await apiCall({ 
            method: "POST", 
            url: "user/login",
            body: JSON.stringify(userInfo)
        });
        if(data.userId){dispatch(setLoginUser(data.userId))}
    }
}

/// PAGE functions
export const back = () => ({ type: "HOME_PAGE" });

export const toggleDrawer = (drawer) =>({
    type: "TOGGLE_DRAWER",
    payload: { drawer: !drawer }
});

export const viewAccount = (account) => ({
    type: "VIEW_PAGE",
    payload: {
        page: "View Account",
        accountView: account
    } 
});
 

//TRANSACTION FUNCTIONS
const setAddTransaction = (transactionInfo) => ({
    type: "ADD_TRANSACTION", 
    payload: transactionInfo
});
export const addTransaction = (transactionInfo) => {
    return async (dispatch) =>{
        let data = await apiCall({
            method: "POST",
            url: "transactions/",
            body: JSON.stringify(transactionInfo)
        });
        if(data.synced > 0){
            dispatch(setAddTransaction(data.newTrans));
        }
        
    }
};

const setDeleteTransaction = (accountId, transId) => ({
    type: "DELETE_TRANSACTION", 
    payload: { accountId, transId }
});

export const deleteTransaction = (accountId, transId) => {
    return async (dispatch) =>{
        let data = await apiCall({
            method: "DELETE",
            url: "transactions/",
            body: JSON.stringify({accountId, transId})
        });
        if(data.synced > 0){
            dispatch(setDeleteTransaction(accountId, transId));
        }
    }
};
 
export const setUpdateTransaction = (tran) => ({
    type: "SET_UPDATE_TRANSACTION", 
    payload: tran
});

const setSendUpdateTransaction = (tran) => ({
    type: "SEND_UPDATE_TRANSACTION", 
    payload: tran
});
 
export const sendUpdateTransaction = (tran) => { 
    return async (dispatch) =>{
        let data = await apiCall({
            method: "PUT",
            url: "transactions/",
            body: JSON.stringify(tran)
        });
        if(data.synced > 0){
            dispatch(setSendUpdateTransaction(tran));
        }
    }
};

//BANK ACCOUNT FUNCTIONS

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



