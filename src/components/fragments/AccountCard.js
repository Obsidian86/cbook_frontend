import React, { Component } from 'react';
import { convMoney } from '../../helper/money';
import { connect } from 'react-redux';


class AccountCard extends Component{ 
    viewAccount = (account) =>{
        this.props.dispatch({
            type: "CHANGE PAGE",
            payload: {
                page: "View Account",
                accountView: account
            }
        });
    }
    render(){

        return(
            <div onClick={ () => this.viewAccount(this.props.account.id) }>
                <div className="mainLine">
                    <p>{ this.props.account.name }</p>
                    <p>{ convMoney(this.props.account.balance) } </p>
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