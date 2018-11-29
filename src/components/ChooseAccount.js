import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import AccountCard from './fragments/AccountCard';
import { loadAccounts } from '../actions/actions';

class ChooseAccount extends Component{
    render(props){ 
        let {accounts, loadState} = this.props; 

        let list = accounts.length > 0 ? 
            accounts.map(account => {
                return( <AccountCard account={account} key={ account.id } /> ) 
            }) 
            : <p><strong>Add a new account to begin</strong></p>;

        return(
            <div>
                <div className='displayList'>
                    { loadState === "loading" ? <p><strong>Loading...</strong></p> : list } 
                </div>
            </div>
        );
    }

    componentDidMount(){
        if(this.props.loadState === "loading"){
            this.props.loadAccounts();
        }
    }


}

const mapDispatchToProps = dispatch =>{
    return{
        loadAccounts: () =>{ dispatch(loadAccounts() )}
    };
};

const mapStateToProps = (state) =>{
    return {
        accounts: state.accounts,
        loadState: state.loadState
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseAccount);