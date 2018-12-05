import { apiCall } from '../helper/apiCall';

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