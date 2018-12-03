import React, { Component } from 'react';
import { convMoney } from '../../helper/money';
import { connect } from 'react-redux';
import { viewAccount } from '../../actions/actions';


class AccountCard extends Component{ 
    render(){  
        return(
            <div onClick={ () => this.props.viewAccount(this.props.account._id) } className="interact" >
                <div className="mainLine">
                    <p>{ this.props.account.name }</p>
                    <p className={this.props.account.balance < 0 ? "subtract" : "add"}>{ convMoney(this.props.account.balance) } </p>
                </div>
                <p>{this.props.account.desc }</p>
            </div>
        );
    } 
} 

const mapDispatchToProps = dispatch => {
    return{
        viewAccount:  account => dispatch( viewAccount(account) )
    }
}

const mapStateToProps = (state) =>{
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountCard);