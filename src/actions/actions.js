export const  deleteTransaction = (transaction, accountId) => ({
    type: "DELETE_TRANSACTION", 
    payload: { accountId,transaction }
});

export const back = () => ({ type: "HOME_PAGE" })