import { todayDate } from '../helper/date';

let defaultState = {
    page: "All Accounts",
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