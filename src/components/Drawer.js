import React, { Component } from 'react';
import '../styles/drawerStyles.css';
import { connect } from 'react-redux';
import NewAccountFields from './fragments/NewAccountFields';
import NewTransactionsFields from './fragments/NewTransactionsFields';
import { toggleDrawer, addTransaction, addAccount } from '../actions/actions';

class Drawer extends Component{ 
    constructor(){
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
            this.props.addAccount(accInfo);
            this.props.toggleDrawer(this.props.drawer);  
            
        }else{
            this.props.addTransaction({
                payee: document.getElementById('payee').value,
                amount: this.state.setDeposit ? document.getElementById("amount").value : (parseInt(document.getElementById("amount").value) * -1),
                date: document.getElementById("date").value,
                cleared: this.state.setCleared ? "yes" : "no"
            });
        }
        for(let i=0; i< document.getElementsByClassName("field").length; i++){ 
            document.getElementsByClassName("field")[i].value = "";
        }
        this.props.toggleDrawer(this.props.drawer); 
        
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
            this.setState({
                [selectionClass]: event.target.classList.contains("setFalse") ? false : true
            });
        };  
    }

    render(){
        return(
            <div className={`actionDrawer ${ this.props.drawer ? "opened" : "" }`}>
                <button id="drawerToggle" onClick={() => this.props.toggleDrawer(this.props.drawer) }>+</button>
                <div>
                    <form action="#" onSubmit={this.handleSubmit}>
                        <h2>{ this.props.page === "All Accounts" ? "Adding new account" : "Adding transaction" }</h2>  
                        { this.props.page === "All Accounts" ? <NewAccountFields /> : <NewTransactionsFields setChoice={this.setChoice} /> } 
                        <br /> <br />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
} 
const mapDispatchToProps = (dispatch) => ({
        toggleDrawer: (drawer) => dispatch(toggleDrawer(drawer)),
        addTransaction: (transactionInfo) => dispatch(addTransaction(transactionInfo)),
        addAccount: (accountInfo) => dispatch(addAccount(accountInfo))
    });
const mapStateToProps = (state) => ({ 
        page: state.page, 
        drawer: state.drawer 
    });
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);