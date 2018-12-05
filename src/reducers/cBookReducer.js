import { addTransaction, sendUpdateTransaction, deleteTransaction } from './reducerActions/transactions'
import defaultState from './defaultState';
 
const cBookreducer = (state=defaultState, action) => {
    let accounts = [...state.accounts]; 
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
            return addTransaction(state, action);
        case "SET_UPDATE_TRANSACTION":
            return {...state, drawer: true, updatingTransaction: Object.assign({}, action.payload) };
        case "SEND_UPDATE_TRANSACTION": 
            return sendUpdateTransaction(state, action);
        case "DELETE_TRANSACTION":
            return deleteTransaction(state, action);
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