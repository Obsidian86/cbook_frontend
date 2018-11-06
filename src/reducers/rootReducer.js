import { allAccounts } from '../data/accounts';

let defaultState = {
    accounts: allAccounts
};

const cBookreducer = (state=defaultState, action) => {
    switch( action.type ){
        case "GET ACCOUNTS": 
            return state;
        default:
            return state;
    }
}

export default cBookreducer;