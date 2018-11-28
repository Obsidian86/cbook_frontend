export const addAccount = (accountInfo) => ({
    type: "ADD_ACCOUNT", 
    payload: accountInfo
});

export const deleteAccount = (id) => ({
    type: "DELETE_ACCOUNT",
    payload: {id}
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

export const viewAccount = (account) => ({ 
    type: "VIEW_PAGE",
    payload: {
        page: "View Account",
        accountView: account
    } 
});

export const toggleDrawer = (drawer) =>({
    type: "TOGGLE_DRAWER",
    payload: { drawer: !drawer }
});