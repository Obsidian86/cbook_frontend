export const addAccount = (accountInfo) => ({
    type: "ADD_ACCOUNT", 
    payload: accountInfo
});

export const deleteAccount = (id) => ({
    type: "DELETE_ACCOUNT",
    payload: {id}
});

export const setUpdateTransaction = (tran) => ({
    type: "SET_UPDATE_TRANSACTION", 
    payload: tran
});

export const deleteTransaction = (transaction, accountId) => ({
    type: "DELETE_TRANSACTION", 
    payload: { accountId, transaction }
});
export const addTransaction = (transactionInfo) => ({
    type: "ADD_TRANSACTION", 
    payload: transactionInfo
});

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
 
const apiCall = async (callParams) =>{
    let URL = `http://localhost:3089/${callParams.url && callParams.url}`;
    return fetch(URL, {
        method: callParams.method || "GET"
    })
    .then(data => data.json())
    .then(data => data)
    .catch(err => { 
        return({ synced: 0 });
    })
}

export const setAccounts = (accountData) =>({
    type: "LOAD_ACCOUNTS",
    payload: { accounts: accountData } 
}); 

export const loadAccounts = (dispatch) =>{
    return async (dispatch) => { 
        let data = await apiCall({
            url: "accounts/getallaccounts"
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



