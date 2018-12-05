import React, { Component } from 'react';
import '../styles/drawerStyles.css';
import { connect } from 'react-redux';
import NewAccountFields from './fragments/NewAccountFields';
import NewTransactionsFields from './fragments/NewTransactionsFields';
import { addAccount, addTransaction, sendUpdateTransaction, toggleDrawer } from '../actions';

class Drawer extends Component{ 
    constructor(props){
        super();
        this.state = {
            setDeposit: true,
            setCleared: true
        }
    }  
    handleSubmit = (e) =>{
        e.preventDefault();
        if( this.props.page === "All Accounts"){
            let accInfo = {
                name: document.getElementById('accountName').value,
                balance: document.getElementById("startingBalance").value,
                desc: document.getElementById("description").value,
            }
            this.props.addAccount(accInfo, this.props.userId);
            this.props.toggleDrawer(this.props.drawer);  
            
        }else{  
            let amount = document.getElementById("amount").value === "" ? 0 : parseFloat(document.getElementById("amount").value);  
            if(amount !== 0 && !this.state.setDeposit){ amount = (parseFloat(amount) * -1); }
            let transactionInfo = {
                account_id: this.props.accountId,
                transaction_id: this.props.updatingTransaction._id || 0,
                transaction: {
                    payee: document.getElementById('payee').value,
                    amount: amount,
                    date: document.getElementById("date").value,
                    cleared: this.state.setCleared ? "yes" : "no"
                }
            };
            if( this.props.updatingTransaction === ""){
                this.props.addTransaction(transactionInfo, this.props.userId);
            }else{
                this.props.sendUpdateTransaction(transactionInfo, this.props.userId);
            }
           
        }
        for(let i=0; i< document.getElementsByClassName("field").length; i++){ 
            document.getElementsByClassName("field")[i].value = "";
        }
        this.props.toggleDrawer(this.props.drawer); 
        
    } 
    changeSelVal = (targ, val) => { 
        this.setState({ [targ]: val });
    }
 
    setChoice = (event) =>{  
        let selectionClass = event.target.classList.contains("setDeposit") ?  "setDeposit" : "setCleared"; 
        let selection = document.getElementsByClassName(selectionClass);
        let change = false;
        if(!event.target.classList.contains("choice")){
            change = true;
            for( let i=0; i<selection.length; i++){ selection[i].classList.toggle("choice") } 
        };
        if(change){ 
            this.changeSelVal(  selectionClass, event.target.classList.contains("setFalse") ? false : true );
        };  
    }
 
    render(){
        let drawerTitle = "";
        if(this.props.page === "All Accounts"){
            drawerTitle = "Adding new account";
        }else{
            drawerTitle = this.props.updatingTransaction !== "" ? "Updating transaction" : "Adding transaction";
        }
        
        let drawer;
        if( this.props.drawer ){
            drawer = 
            <form action="#" onSubmit={this.handleSubmit}>
                <h2>{ drawerTitle }</h2>  
                { this.props.page === "All Accounts" ? <NewAccountFields /> : <NewTransactionsFields setChoice={this.setChoice} changeSelVal={this.changeSelVal} /> } 
                <br /> <br />
                <button>Submit</button>
            </form>
        }else{
            drawer = <p>Loading content</p>;
        } 
        return(
            <div className={`actionDrawer ${ this.props.drawer ? "opened" : "" }`}>
                <button id="drawerToggle" onClick={() => this.props.toggleDrawer(this.props.drawer) }>+</button>
                <div>
                    {drawer}
                </div>
            </div>
        )
    }
} 
const mapDispatchToProps = (dispatch) => ({
        toggleDrawer: (drawer) => dispatch(toggleDrawer(drawer)),
        addTransaction: (transactionInfo, userId) => dispatch(addTransaction(transactionInfo, userId)),
        sendUpdateTransaction: (transactionInfo, userId) => dispatch(sendUpdateTransaction(transactionInfo, userId)),
        addAccount: (accountInfo, userId) => dispatch(addAccount(accountInfo, userId))
    });

const mapStateToProps = (state) => ({ 
        page: state.page, 
        drawer: state.drawer,
        accountId: state.accountView._id,
        userId: state.user,
        updatingTransaction: state.updatingTransaction
    });
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);