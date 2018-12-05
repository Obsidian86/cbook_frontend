export const addTransaction = (state, action) => {
    let transaction = Object.assign({ ...state.accountView, balance: (parseFloat(state.accountView.balance) + parseFloat(action.payload.amount)), transactions: [action.payload, ...state.accountView.transactions ] } ); 
    let allAccounts = [...state.accounts]; 
    for(let i=0; i<allAccounts.length; i++){
        if(allAccounts[i].id === state.accountView.id){
            allAccounts[i] = transaction;
            break;
        }
    }
    return {...state, accountView: transaction, accounts: allAccounts };
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