import React, { Component } from 'react';
import { convMoney } from '../helper/money'
import { connect } from 'react-redux';
import { deleteTransaction, back, deleteAccount, setUpdateTransaction } from '../actions/actions';
import Settings from './Settings';
import TransactionList from './fragments/TransactionList';
 
class ViewAccount extends Component {  
    constructor(){
        super();
        this.state = { settings: false } 
    }

    toggleSettings = () => {
        this.setState({
            settings: !this.state.settings
        });
    }

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
        let { back, accountView, setUpdateTransaction } = this.props;
        let { name, desc, balance, transactions, _id } = accountView;   
        return(
            <div>
                { this.state.settings === true && <Settings name={name} id={_id} toggleSettings={this.toggleSettings } deleteAccount={ this.props.deleteAccount } /> }
                <div className='displayList'>
                    <div className="column">
                        <button onClick={ back }>Back</button>
                        <h2>{ name }</h2>
                        <button onClick={ this.toggleSettings } >Settings</button>
                    </div>
                    <div className='info centered'>
                        <p>{ desc }</p>
                        <p>{ convMoney(balance) }</p>
                    </div> 
                    <TransactionList 
                        toggleOptions={this.toggleOptions} 
                        setUpdateTransaction={setUpdateTransaction} 
                        deleteTransaction={this.props.deleteTransaction} 
                        transactions={transactions} 
                        accountId={accountView._id} 
                    />
                </div>
            </div>
        )
    }
    
} 
const mapStateToProps = (state) =>({accountView : state.accountView});
const mapDispatchToProps = (dispatch) =>{
    return { 
        deleteTransaction: (accountId, transId) => dispatch(deleteTransaction(accountId, transId)),
        deleteAccount: (id) => dispatch(deleteAccount(id)),
        setUpdateTransaction: (tran) => dispatch(setUpdateTransaction(tran)),
        back: () => dispatch(back())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAccount);