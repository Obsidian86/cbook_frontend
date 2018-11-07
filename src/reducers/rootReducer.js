import { allAccounts } from '../data/accounts';

let defaultState = {
    page: "All Accounts",
    accountView: {},
    accounts: allAccounts
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
        case "CHANGE PAGE": 
            let vAccount = state.accounts.filter((account) => action.payload.accountView === account.id ); 
            return {...state, page: action.payload.page, accountView: Object.assign({ ...vAccount[0] }) }
        default:
            return state;
    }
}

export default cBookreducer;