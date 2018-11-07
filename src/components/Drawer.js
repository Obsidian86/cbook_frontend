import React, { Component } from 'react';
import '../styles/drawerStyles.css';
import { connect } from 'react-redux';
import NewAccountFields from './fragments/NewAccountFields';
import NewTransactionsFields from './fragments/NewTransactionsFields';

class Drawer extends Component{ 
    toggleDrawer = () =>{
        this.props.dispatch({
            type: "TOGGLE DRAWER",
            payload: { drawer: !this.props.drawer }
        })
    } 
    addAccount = () =>{ 
        let accInfo = {
            name: document.getElementById('accountName').value,
            balance: document.getElementById("startingBalance").value,
            desc: document.getElementById("description").value,
        }
        this.props.dispatch({type: "ADD ACCOUNT", payload: accInfo});
        document.getElementById('accountName').value = "";
        document.getElementById("startingBalance").value = "";
        document.getElementById("description").value = "";
        this.toggleDrawer(); 
    }
    addTransaction = () => {
        let transactionInfo = {
            payee: document.getElementById('payee').value,
            amount: document.getElementById("amount").value,
            date: document.getElementById("date").value,
            cleared: document.getElementById("cleared").value
        }
        this.props.dispatch({type: "ADD TRANSACTION", payload: transactionInfo});
        this.toggleDrawer(); 
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if( this.props.page === "All Accounts"){
            this.addAccount();
        }else{
            this.addTransaction();
        }
    }

    render(){
        return(
            <div className={`actionDrawer ${ this.props.drawer ? "opened" : "" }`}>
                <button id="drawerToggle" onClick={this.toggleDrawer}>+</button>
                <div>
                    <form action="#" onSubmit={this.handleSubmit}>
                        <h2>{ this.props.page === "All Accounts" ? "Adding new account" : "Adding transaction" }</h2> 
                        <hr />
                            { this.props.page === "All Accounts" ? <NewAccountFields /> : <NewTransactionsFields /> } 
                        <br /> <br />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
} 

const mapStateToProps = (state) => {
    return { page: state.page, drawer: state.drawer }
}
export default connect(mapStateToProps)(Drawer);