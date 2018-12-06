import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { loginUser, createUser} from '../actions';
import UserBar from './fragments/ui/UserBar';
import { setMessage, checkLoggedIn } from '../actions'; 

class ChooseUser extends Component{

    constructor(){
        super();
        this.state = ({
            loginForm: true
        });
    }

    toggleForm = (e) =>{
        e.preventDefault();
        this.setState({ loginForm: !this.state.loginForm });
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        let createInfo = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }

        let valErrors = "";

        if(createInfo.username === ""){
            valErrors =  "Username can not be empty";
        } 
        if(createInfo.password === ""){
            valErrors =  "Password can not be empty";
        } 

 
        if(this.state.loginForm){
            if(valErrors === ""){
                this.props.loginUser(createInfo); 
            }else{
                this.props.setMessage({message: valErrors});
            }
            
        } else{ 
            createInfo.repassword = document.getElementById("rePassword").value 

            if( createInfo.password !== createInfo.repassword){
                valErrors =  "Passwords must match";
            } else if(createInfo.password.length < 5){
                valErrors = "Password must be longer than four characters";
            } 

            if(valErrors === ""){
                this.props.createUser(createInfo); 
            }else{
                this.props.setMessage({message: valErrors});
            } 
            
        }
       
    }

    componentDidMount(){
        this.props.checkLoggedIn();
    }

    render(){
        return(
            <div>
                <div className='displayList'>
                   <p><strong><UserBar title={ this.state.loginForm ? "Login" : "New user"} /> </strong></p>
                   <p ><strong>{ this.props.message !== "" && this.props.message }</strong></p>
                   <form action="#" onSubmit={ (e)=>{this.handleSubmit(e)} }>
                        <label htmlFor="username">Username</label>
                        <input type='text' id="username" />
                        <label htmlFor="username">Password</label>
                        <input type='password' id="password"/>
                        { !this.state.loginForm && 
                            <span>
                                <label htmlFor="rePassword">Re-type password</label>
                                <input type='password' id="rePassword"/> 
                            </span>
                        }
                        <br /><br />
                        <div className='column'>
                            { this.state.loginForm ? 
                                <button className="blue" onClick={ (e) => this.toggleForm(e) }>New user</button> : 
                                <button className="blue" onClick={ (e) => this.toggleForm(e) }>Login</button> }
                            <button className="green">Submit</button>
                        </div> 
                        <br /><br />
                   </form> 
                </div>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) =>{
    return{ 
        loginUser: (userInfo) => dispatch(loginUser(userInfo)),
        createUser: (userInfo) => dispatch(createUser(userInfo)),
        setMessage: (message) => dispatch(setMessage(message)),
        checkLoggedIn: () => dispatch(checkLoggedIn())
    };
};

const mapStateToProps = (state) =>{
    return { 
        message: state.message,
        user: state.user
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseUser);