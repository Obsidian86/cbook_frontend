export const toggleDrawer = (state, action) =>{
    return {...state, drawer: action.payload.drawer, updatingTransaction: ""}; 
}
export const viewPage = (state, action) =>{
    let vAccount = state.accounts.filter((account) => action.payload.accountView === account._id ); 
    return {...state, drawer: false, page: action.payload.page, accountView: Object.assign({ ...vAccount[0] }) };
}
export const homePage = (state, action) =>{
    return {...state, drawer: false, page: "All Accounts", accountView: {}};
}
export const setMessage = (state, action) =>{
    return {...state, message: action.payload.message}
}
export const toggleSettings = (state) =>{
    return {...state, settings: !state.settings }
}