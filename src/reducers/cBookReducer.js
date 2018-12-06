import * as transReducer from './reducerActions/transactions';
import * as accountReducer from './reducerActions/accounts';
import * as viewReducer from './reducerActions/views';
import * as userReducer from './reducerActions/user';
import defaultState from './defaultState';
 

const cBookreducer = (state=defaultState, action) => { 
    switch( action.type ){
        case "LOGIN_USER":
            return userReducer.loginUser(state, action);
        case "LOGOUT_USER":
            return { ...defaultState }; 
        case "DELETE_USER":
            return userReducer.deleteUser(state, action); 

        case "LOAD_ACCOUNTS":  
            return accountReducer.loadAccounts(state, action);
        case "ADD_ACCOUNT":
            return accountReducer.addAccount(state, action);
        case "DELETE_ACCOUNT":   
            return accountReducer.deleteAccount(state, action);

        case "ADD_TRANSACTION": 
            return transReducer.addTransaction(state, action);
        case "SET_UPDATE_TRANSACTION":
            return transReducer.setUpdateTransaction(state, action);
        case "SEND_UPDATE_TRANSACTION": 
            return transReducer.sendUpdateTransaction(state, action);
        case "DELETE_TRANSACTION":
            return  transReducer.deleteTransaction(state, action);

        case "VIEW_PAGE": 
            return viewReducer.viewPage(state, action);
        case "HOME_PAGE":  
            return viewReducer.homePage(state, action);
        case "SET_MESSAGE":
            return viewReducer.setMessage(state, action);
        case "TOGGLE_DRAWER": 
            return viewReducer.toggleDrawer(state, action);

        default:
            return state;
    }
} 

export default cBookreducer;