import React, { Component } from 'react';
import '../styles/drawerStyles.css';
import { connect } from 'react-redux';

class Drawer extends Component{
    constructor(){
        super();
        this.state = ({  drawer: false });
    }
    toggleDrawer = () =>{
        this.setState({ drawer: !this.state.drawer })
    }
    addAccount = () =>{
            console.log("account")
        /*
        let accInfo = {
            name: document.getElementById('accountName').value,
            balance: document.getElementById("startingBalance").value,
            desc: document.getElementById("description").value,
        }

        this.props.dispatch({type: "ADD ACCOUNT", payload: accInfo});
        document.getElementById('accountName').value = "";
        document.getElementById("startingBalance").value = "";
        document.getElementById("description").value = "";
        this.toggleDrawer(); */
    }
    addTransaction = () => {
        console.log("trans")
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
            <div className={`actionDrawer ${ this.state.drawer ? "opened" : "" }`}>
                <button id="drawerToggle" onClick={this.toggleDrawer}>+</button>
                <div>
                    <form action="#" onSubmit={this.handleSubmit}>
                        <h2>{ this.props.page === "All Accounts" ? "Adding new account" : "Adding transaction" }</h2> 
                        <hr />
                        <label htmlFor='accountName'>Account name</label>
                        <input type='text' id='accountName' name='accountName' /> 

                        <label htmlFor='startingBalance'>Starting balance</label>
                        <input type='text' id='startingBalance' name='startingBalance' />

                        <label htmlFor='description' >Description</label>
                        <input type='text' id='description' name='description' />
                        <br />
        { /*payee amount data cleared : rm name, start balance and desc */}
                        <br />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
} 

const mapStateToProps = (state) => {
    return { page: state.page }
}
export default connect(mapStateToProps)(Drawer);