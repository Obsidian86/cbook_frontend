import * as userActions from './userActions';
import * as viewActions from './viewActions';
import * as accountActions from './accountActions';
import * as transactionActions from './transactionActions';

export const loginUser = userActions.loginUser;

export const back = viewActions.back;
export const viewAccount = viewActions.viewAccount;
export const toggleDrawer = viewActions.toggleDrawer;

export const addAccount = accountActions.addAccount;
export const deleteAccount = accountActions.deleteAccount;
export const loadAccounts = accountActions.loadAccounts;

export const addTransaction = transactionActions.addTransaction;
export const deleteTransaction = transactionActions.deleteTransaction;
export const setUpdateTransaction = transactionActions.setUpdateTransaction;
export const sendUpdateTransaction = transactionActions.sendUpdateTransaction;






