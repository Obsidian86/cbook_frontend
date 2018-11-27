import React, { Component } from 'react';
import { convMoney } from '../../helper/money';
import { connect } from 'react-redux';


class AccountCard extends Component{ 
    viewAccount = (account) =>{
        this.props.dispatch({
            type: "VIEW PAGE",
            payload: {
                page: "View Account",
                accountView: account
            }
        });
    }
    render(){

        return(
            <div onClick={ () => this.viewAccount(this.props.account.id) } className="interact" >
                <div className="mainLine">
                    <p>{ this.props.account.name }</p>
                    <p className={this.props.account.balance < 0 ? "subtract" : "add"}>{ convMoney(this.props.account.balance) } </p>
                </div>
                <p>{this.props.account.desc }</p>
            </div>
        );
    }
    
} 
const mapStateToProps = (state) =>{
    return {}
}
export default connect(mapStateToProps)(AccountCard);