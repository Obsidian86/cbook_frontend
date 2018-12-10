export const addTransaction = (state, action) => {
    let account = Object.assign({}, state.accountView);
    account.balance = (parseFloat(state.accountView.balance) + parseFloat(action.payload.amount));
    account.transactions = [...state.accountView.transactions, action.payload];
    
    let allAccounts = [...state.accounts]; 

    for(let i=0; i<allAccounts.length; i++){
        if(allAccounts[i]._id === account._id){
            allAccounts[i] = account;
            break;
        }
    }
    return {...state, accountView: account, accounts: [...allAccounts] };
}

export const sendUpdateTransaction = (state, action) => {
    let accounts = [...state.accounts];
    let accNum;
    for( let i=0; i< accounts.length; i++){ 
        if( accounts[i]._id === action.payload.account_id ){
            accNum = i;
            for(let j=0; j<accounts[i].transactions.length; j++){
                if(accounts[i].transactions[j]._id === action.payload.transaction_id){
                    accounts[i].balance =  (parseFloat(accounts[i].balance) - parseFloat(accounts[i].transactions[j].amount)) + parseFloat(action.payload.transaction.amount);
                    accounts[i].transactions[j] = {...action.payload.transaction, _id: action.payload.transaction_id}
                } 
            } 
        }
    } 
    return {...state, drawer: false, updatingTransaction: "", accounts: [...accounts], accountView: Object.assign({}, accounts[accNum]) };
}

export const deleteTransaction = (state, action) => {
    let accounts = [...state.accounts];
    let accNum;
    for( let i=0; i<accounts.length; i++){
        if( accounts[i]._id === action.payload.accountId ){
            accNum = i;
        }
    } 
    let subtractAmount = accounts[accNum].transactions.filter((ac) => ac._id === action.payload.transId )[0].amount; 
    accounts[accNum].transactions = accounts[accNum].transactions.filter((ac) => ac._id !== action.payload.transId ); 
    accounts[accNum].balance = parseFloat(state.accountView.balance) - parseFloat(subtractAmount);
    return {    
        ...state,
        accounts: [...accounts], 
        accountView: {...accounts[accNum]} 
    };
}
export const setUpdateTransaction = (state, action) =>{
    return {...state, drawer: true, updatingTransaction: Object.assign({}, action.payload) };
}