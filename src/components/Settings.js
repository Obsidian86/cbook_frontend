import React, { Component } from 'react';
import '../styles/settings.css';

class Settings extends Component{
    constructor(){
        super();
        this.state = {
            verify: false
        }
    }

    deleteAccount = () => { 
        if(this.state.verify){ 
            this.props.deleteAccount(this.props.id, this.props.userId);
        }else{
            this.setState({verify: true});
        }
    } 
    render(){  
        return(
            <div id="settingsContainer">
                <div id="settingsBox">
                    <button className="red close_btn" onClick={ this.props.toggleSettings } > Close </button>
                    <h2>Settings</h2> 
                     
                    <strong>{ this.props.name }</strong>
                    
                    { this.state.verify && <p>Are you sure you want to delete this account?</p> }
                    <button className="red" onClick={ this.deleteAccount }>
                        { this.state.verify ? "Yes, delete this account" : "Delete Account"}
                    </button>
                    
                </div>
            </div>
        )
    }
}



export default Settings;