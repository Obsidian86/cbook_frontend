import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import AccountCard from './fragments/AccountCard';

class ChooseAccount extends Component{
    render(props){ 
        let {accounts} = this.props;
        return(
            <div>
                <div className='displayList'>
                    { 
                        accounts.length > 0 ? accounts.map(account => {
                            return( <AccountCard account={account} key={ account.id } /> ) 
                        }) : <div><br />Add a new account to begin<br /><br /></div> 
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {accounts: state.accounts}
}

export default connect(mapStateToProps)(ChooseAccount);