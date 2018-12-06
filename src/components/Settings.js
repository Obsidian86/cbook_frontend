import React, { Component } from 'react';
import '../styles/settings.css';
import { connect } from 'react-redux';
import { logOut } from '../actions';

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
            this.props.deleteAccount(this.props.accountId, this.props.userId);
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
        return(
            <div id="settingsContainer">
                <div id="settingsBox">
                    <button className="red close_btn" onClick={ this.props.toggleSettings } > Close </button>
                    <h2>Settings</h2> 
                    <strong>{ this.props.name }</strong>

                    <button className="btn blue" onClick={this.props.logOut} >Log out</button>

                    { this.state.verifyDelAccount && <p>Are you sure you want to delete this account?</p> }
                    <button className="red" onClick={ this.deleteAccount }>
                        { this.state.verifyDelAccount ? "Yes, delete this account" : "Delete Account"}
                    </button>

                    <hr />

                    <button className="red" onClick={ this.deleteAccount }>
                        { this.state.verifyDelAccount ? "Yes, delete this account" : "Delete User"}
                    </button>
                    
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) =>{
    return{
        accountId: state.accountView._id || "",
        userId: state.user,
        page: state.page
    };
}
const mapDispatchToProps = (dispatch) =>{
    return{
        logOut: () => dispatch(logOut())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);