import React, { Component } from 'react';
import '../styles/settings.css';
import { connect } from 'react-redux';
import Load from '../components/fragments/ui/Load';
import { logOut, toggleSettings, deleteUser, deleteAccount } from '../actions';

class Settings extends Component{
    constructor(){
        super();
        this.state = {
            verifyDelAccount: false, 
            verifyDelUser: false        
        }
    }
 
    deleteAccount = () => { 
        if(this.state.verifyDelAccount){ 
            this.props.deleteAccount(this.props.accountView._id, this.props.userId);
        }else{
            this.setState({verifyDelAccount: true});
        } 
    }
    deleteUser = () => { 
        if(this.state.verifyDelUser){ 
            this.props.deleteUser(this.props.userId);
        }else{
            this.setState({verifyDelUser: true});
        } 
    }

    render(){

        const delAccountButton = () =>{
                    return(<button className="red" onClick={ this.deleteAccount }>
                        { this.state.verifyDelAccount ? "Yes, delete this account" : "Delete Account"}
                    </button>)
        }

        return(
            <div id="settingsContainer">
                <div id="settingsBox">
                    <button className="red close_btn" onClick={ this.props.toggleSettings } > Close </button>
                    <h2>Settings</h2> 
                    <strong>{ this.props.accountView.name || "User Account"} </strong>

                    { this.props.message && <Load message={this.props.message} />}

                    <button className="btn blue" onClick={this.props.logOut} >Log out</button>

                    { this.state.verifyDelAccount && <p>Are you sure you want to delete this account?</p> }

                    { this.props.accountView._id && delAccountButton() } 

                    <hr />

                    { this.state.verifyDelUser && <p>Are you sure you want to delete this user and all accounts/transactions?</p> }
                    <button className="red" onClick={ this.deleteUser }>
                        { this.state.verifyDelUser ? "Yes, delete this account" : "Delete User"}
                    </button>
                    
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) =>{
    return{
        accountView: state.accountView,
        userId: state.user,
        page: state.page, 
        message: state.message
    };
}
const mapDispatchToProps = (dispatch) =>{
    return{
        logOut: () => dispatch(logOut()),
        toggleSettings: () => dispatch(toggleSettings()),
        deleteAccount: (accountId, userId) => dispatch(deleteAccount(accountId, userId)),
        deleteUser: (userId) => dispatch(deleteUser(userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);