import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import AccountCard from './fragments/AccountCard';
import { loadAccounts } from '../actions';
import { convMoney } from '../helper/money';

class ChooseAccount extends Component{
    render(){ 
        let {accounts, loadState} = this.props; 
        let totalAmount = 0; 
        let list = accounts.length > 0 ? 
            accounts.map(account => {
                totalAmount = totalAmount + parseFloat(account.balance);
                return (<AccountCard account={account} key={ account._id } />)
            }) 
            : <p><strong>Add a new account to begin</strong></p>;

        return(
            <div>
                <div className='displayList'>
                    <div className="column"> 
                        <h2>Total: { convMoney(totalAmount) }</h2>
                        <button >Settings</button>
                    </div> 
                    { loadState === "loading" ? <p><strong>Loading...</strong></p> : list } 
                </div>
            </div>
        );
    }

    componentDidMount(){
        if(this.props.loadState === "loading"){ this.props.loadAccounts(this.props.userId); }
    } 
}

const mapDispatchToProps = dispatch =>({
        loadAccounts: (userId) => dispatch(loadAccounts(userId))
    });

const mapStateToProps = (state) =>({
    accounts: state.accounts,
    loadState: state.loadState,
    userId: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseAccount);