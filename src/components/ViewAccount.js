import React, { Component } from 'react';
import { convMoney } from '../helper/money'
import { connect } from 'react-redux';
import { deleteTransaction, back, deleteAccount, setUpdateTransaction } from '../actions/actions';
import Settings from './Settings';
 
class ViewAccount extends Component {  
    constructor(){
        super();
        this.state = { settings: false }
    }

    toggleSettings = () => {
        this.setState({
            settings: !this.state.settings
        });
    }

    toggleOptions = (target) =>{ 
        let targ = document.getElementById(target);
        let oldTarg = document.getElementsByClassName("show");
        if( targ.classList.contains("show")){
            oldTarg[0].classList.remove("show");
        }else{
            if( oldTarg.length > 0){
                oldTarg[0].classList.remove("show");
            } 
            targ.classList.add("show");
        }
    }
    
    render(){
        let { back, deleteTransaction, accountView, setUpdateTransaction } = this.props;
        let { name, desc, balance, transactions, id } = accountView; 
        return(
            <div>
                { this.state.settings === true && <Settings name={name} id={id} toggleSettings={this.toggleSettings } deleteAccount={ this.props.deleteAccount } /> }
                <div className='displayList'>
                    <div className="column">
                        <button onClick={ back }>Back</button>
                        <h2>{ name }</h2>
                        <button onClick={ this.toggleSettings } >Settings</button>
                    </div>
                    <div className='info centered'>
                        <p>{ desc }</p>
                        <p>{ convMoney(balance) }</p>
                    </div> 
                    { transactions.map((tran, index)=> (
                        <div key={index} id={`t${index}`} className="interact" onClick={() => this.toggleOptions(`t${index}`) }>
                            <div className="mainLine">
                                <p>{ tran.payee } </p>
                                <p className={ tran.amount >= 0 ? "add" : "subtract" } >{ convMoney(tran.amount) }</p>
                            </div>
                            <div className="column">
                                <p>{tran.date}</p>
                                <p>{tran.cleared === "yes" ? "cleared" : "not cleared"}</p>
                            </div>
                            <div className="options">
                                <button className="green" onClick={()=>{ setUpdateTransaction(index, tran) }} >update</button>
                                <button className="red" onClick={ () => deleteTransaction(index) } >delete</button>
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
const mapDispatchToProps = (dispatch) =>{
    return { 
        deleteTransaction: (index, id) => dispatch(deleteTransaction(index, id)),
        deleteAccount: (id) => dispatch(deleteAccount(id)),
        setUpdateTransaction: (tran) => dispatch(setUpdateTransaction(tran)),
        back: () => dispatch(back())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAccount);