import React, { Component } from 'react';
import { convMoney } from '../helper/money'
import { connect } from 'react-redux';
import { deleteTransaction, setUpdateTransaction, back, toggleSettings } from '../actions';  
import Settings from './Settings';
import TransactionList from './fragments/TransactionList';
 
class ViewAccount extends Component { 

    toggleOptions = (target) =>{ 
        let targ = document.getElementById(target);
        let oldTarg = document.getElementsByClassName("show");
        if( targ.classList.contains("show")){
            oldTarg[0].classList.remove("show");
        }else{
            if( oldTarg.length > 0){
                oldTarg[0].classList.remove("show");
            } 
            targ.classList.add("show");
        }
    }
    
    render(){
        let { back, accountView, setUpdateTransaction, toggleSettings, settings, userId } = this.props;
        let { name, desc, balance, transactions } = accountView;   
        return(
            <div>
                { settings && <Settings /> }
                <div className='displayList'>
                    <div className="column">
                        <button onClick={ back }>Back</button>
                        <h2>{ name }</h2>
                        <button onClick={ toggleSettings } >Settings</button>
                    </div>
                    <div className='info centered'>
                        <p>{ desc }</p>
                        <p>{ convMoney(balance) }</p>
                    </div> 
                    <TransactionList 
                        toggleOptions={this.toggleOptions} 
                        setUpdateTransaction={setUpdateTransaction} 
                        deleteTransaction={this.props.deleteTransaction}
                        userId={userId}
                        transactions={transactions} 
                        accountId={accountView._id} 
                    />
                </div>
            </div>
        )
    }
    
} 
const mapStateToProps = (state) =>({
    accountView : state.accountView,
    userId: state.user,
    settings: state.settings
});
const mapDispatchToProps = (dispatch) =>{
    return { 
        deleteTransaction: (accountId, transId, userId) => dispatch(deleteTransaction(accountId, transId, userId)), 
        setUpdateTransaction: (tran) => dispatch(setUpdateTransaction(tran)),
        back: () => dispatch(back()),
        toggleSettings: () => dispatch(toggleSettings())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAccount);