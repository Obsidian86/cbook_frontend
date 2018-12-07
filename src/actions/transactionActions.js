import { apiCall } from '../helper/apiCall';

const setAddTransaction = (transactionInfo) => ({
    type: "ADD_TRANSACTION", 
    payload: transactionInfo
});

export const addTransaction = (transactionInfo, userId) => {
    return async (dispatch) =>{
        let data = await apiCall({
            method: "POST",
            url: `transactions/${userId}`,
            body: JSON.stringify(transactionInfo),
            applyAuth: true
        });
        if(!data.error){
            dispatch(setAddTransaction(data.newTrans));
        }else{
            dispatch({type: "ERROR", payload: data.error.error })
        }
        
    }
};

const setDeleteTransaction = (accountId, transId) => ({
    type: "DELETE_TRANSACTION", 
    payload: { accountId, transId }
});

export const deleteTransaction = (accountId, transId, userId) => {
    return async (dispatch) =>{
        let data = await apiCall({
            method: "DELETE",
            url: `transactions/${userId}`,
            body: JSON.stringify({accountId, transId}),
            applyAuth: true
        });
        if(!data.error){
            dispatch(setDeleteTransaction(accountId, transId));
        }else{
            dispatch({type: "ERROR", payload: data.error.error })
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
 
export const sendUpdateTransaction = (tran, userId) => { 
    return async (dispatch) =>{
        let data = await apiCall({
            method: "PUT",
            url: `transactions/${userId}`,
            body: JSON.stringify(tran),
            applyAuth: true
        });
        if(!data.error){
            dispatch(setSendUpdateTransaction(tran));
        }else{
            dispatch({type: "ERROR", payload: data.error.error })
        }
    }
};