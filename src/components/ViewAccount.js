import React, { Component } from 'react';
import { convMoney } from '../helper/money'
import { connect } from 'react-redux';

class ViewAccount extends Component {  

    back = () => {
        this.props.dispatch({
            type: "HOME PAGE"
        });
    }

    render(){
        let {name, desc, balance, transactions } = this.props.accountView;
        return(
            <div>
                <div className='displayList'>
                    <div className="column">
                        <button onClick={ this.back }>Back</button>
                        <h2>{ name }</h2>
                        <button>settings</button>
                    </div>
                    <div className='info centered'>
                        <p>{ desc }</p>
                        <p>{ convMoney(balance) }</p>
                    </div> 
                    { transactions.map((tran, index)=> (
                        <div key={index} >
                            <div className="mainLine">
                                <p>{ tran.payee } </p>
                                <p>{ convMoney(tran.amount) }</p>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = (state) =>{
    return{accountView : state.accountView }
}
export default connect(mapStateToProps)(ViewAccount);