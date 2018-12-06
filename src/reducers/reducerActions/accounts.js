export const addAccount = (state, action) =>{
    let newAcc = { ...action.payload.accountInfo }
    newAcc.transactions = [action.payload.tran];  
    return Object.assign({...state, accounts: [...state.accounts, newAcc ] });
}
export const deleteAccount = (state, action) =>{
    let accounts = [...state.accounts];
    return { ...state, accounts: accounts.filter(acc => acc._id !== action.payload.id ), drawer: false, page: "All Accounts", accountView: {}};
}
export const loadAccounts = (state, action) =>{
    return {...state, loadState: "loaded", accounts: action.payload.accounts};
}