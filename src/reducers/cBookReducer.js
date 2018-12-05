let defaultState = {
    page: "Log In",
    message: "",
    user: "",
    accountView: {},
    updatingTransaction: "",
    loadState: "loading",
    accounts: [],
    drawer: false
};

const cBookreducer = (state=defaultState, action) => {
    let accounts = [...state.accounts];
    let accNum;
    switch( action.type ){
        case "LOGIN_USER":
            return {...state, message: "", user: action.payload.userId, page: "All Accounts" };
        case "LOGOUT_USER":
            return { ...defaultState };
        case "LOAD_ACCOUNTS":  
            return {...state, loadState: "loaded", accounts: action.payload.accounts};
        case "ADD_ACCOUNT":  
            let newAcc = { ...action.payload.accountInfo }
            newAcc.transactions = [action.payload.tran];  
            return Object.assign({...state, accounts: [...state.accounts, newAcc ] });
        case "DELETE_ACCOUNT":   
            return { ...state, accounts: accounts.filter(acc => acc._id !== action.payload.id ), drawer: false, page: "All Accounts", accountView: {}};
        case "ADD_TRANSACTION": 
            let transaction = Object.assign({ ...state.accountView, balance: (parseFloat(state.accountView.balance) + parseFloat(action.payload.amount)), transactions: [action.payload, ...state.accountView.transactions ] } ); 
            let allAccounts = [...state.accounts]; 
            for(let i=0; i<allAccounts.length; i++){
                if(allAccounts[i].id === state.accountView.id){
                    allAccounts[i] = transaction;
                    break;
                }
            }
            return {...state, accountView: transaction, accounts: allAccounts };
        case "SET_UPDATE_TRANSACTION":
            return {...state, drawer: true, updatingTransaction: Object.assign({}, action.payload) };
        case "SEND_UPDATE_TRANSACTION": 
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
        case "DELETE_TRANSACTION":
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
        case "VIEW_PAGE": 
            let vAccount = state.accounts.filter((account) => action.payload.accountView === account._id ); 
            return {...state, drawer: false, page: action.payload.page, accountView: Object.assign({ ...vAccount[0] }) }
        case "HOME_PAGE":  
            return {...state, drawer: false, page: "All Accounts", accountView: {}};
        case "TOGGLE_DRAWER": 
            return {...state, drawer: action.payload.drawer, updatingTransaction: ""}; 
        default:
            return state;
    }
}

export default cBookreducer;