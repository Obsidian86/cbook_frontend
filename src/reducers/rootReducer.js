import { allAccounts } from '../data/accounts';

let defaultState = {
    page: "All Accounts",
    accountView: {},
    accounts: allAccounts,
    drawer: false
};

const cBookreducer = (state=defaultState, action) => {
    switch( action.type ){
        case "GET ACCOUNTS": 
            return state;
        case "ADD ACCOUNT":  
            let newAccount = action.payload;
            newAccount.id = state.accounts.length + 1;
            newAccount.transactions = []; 
            return Object.assign({...state, accounts: [...state.accounts , newAccount] });
        case "ADD TRANSACTION": 
            let transaction = Object.assign({ ...state.accountView, transactions: [action.payload, ...state.accountView.transactions ] } ); 
            let allAccounts = [...state.accounts]; 
            for(let i=0; i<allAccounts.length; i++){
                if(allAccounts[i].id === state.accountView.id){
                    allAccounts[i] = transaction;
                    break;
                }
            }
            return {...state, accountView: transaction, accounts: allAccounts };
        case "DELETE_TRANSACTION": 
            let accounts = state.accounts;
            let accNum = () => {
                for( let i=0; i<accounts.length; i++){
                    if( accounts[i].id === action.payload.accountId ){
                        return i;
                    }
                }
            }  
            accounts[accNum()].transactions = accounts[accNum()].transactions.filter((ac, index) => index !== action.payload.transaction ); 

            return {...state, accounts: [...accounts], accountView: {...accounts[accNum()]} };
        case "VIEW PAGE":
            let vAccount = state.accounts.filter((account) => action.payload.accountView === account.id ); 
            return {...state, drawer: false, page: action.payload.page, accountView: Object.assign({ ...vAccount[0] }) }
        case "HOME PAGE":  
            return {...state, drawer: false, page: "All Accounts", accountView: {}};
        case "TOGGLE DRAWER":  
            return {...state, drawer: action.payload.drawer};
        default:
            return state;
    }
}

export default cBookreducer;