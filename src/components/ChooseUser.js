import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { loginUser } from '../actions/actions';

class ChooseUser extends Component{  
    handleLogin = (e) =>{
        e.preventDefault();
        this.props.loginUser({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
    }

    render(){
        return(
            <div>
                <div className='displayList'>
                   <p><strong>Log in</strong></p>
                   <p><strong>{ this.props.message !== "" && this.props.message }</strong></p>
                   <form action="#" onSubmit={ (e)=>{this.handleLogin(e)} }>
                        <label htmlFor="username">Username</label>
                        <input type='text' id="username" />
                        <label htmlFor="username">Password</label>
                        <input type='password' id="password"/>
                        <br /><br />
                        <button>Submit</button>
                        <br /><br />
                   </form> 
                </div>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) =>{
    return{ 
        loginUser: (userInfo) => dispatch(loginUser(userInfo))
    };
};

const mapStateToProps = (state) =>{
    return { 
        message: "",
        user: state.user
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseUser);