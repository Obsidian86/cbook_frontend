import React, { Component } from 'react';
import { convMoney } from '../helper/money'
import { connect } from 'react-redux';
import { deleteTransaction, back } from '../actions/actions';

class ViewAccount extends Component {  

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
        let { back, deleteTransaction, accountView } = this.props;
        let {name, desc, balance, transactions, id } = accountView;
        return(
            <div>
                <div className='displayList'>
                    <div className="column">
                        <button onClick={ back }>Back</button>
                        <h2>{ name }</h2>
                        <button>Settings</button>
                    </div>
                    <div className='info centered'>
                        <p>{ desc }</p>
                        <p>{ convMoney(balance) }</p>
                    </div> 
                    { transactions.map((tran, index)=> (
                        <div key={index} id={`t${index}`} className="interact" onClick={() => this.toggleOptions(`t${index}`) }>
                            <div className="mainLine">
                                <p>{ tran.payee } </p>
                                <p>{ convMoney(tran.amount) }</p>
                            </div>
                            <div className="column">
                                <p>{tran.date}</p>
                                <p>{tran.cleared === "yes" ? "cleared" : "not cleared"}</p>
                            </div>
                            <div className="options">
                                <button className="green">update</button>
                                <button className="red" onClick={ () => deleteTransaction(index, id ) } >delete</button>
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
        back: () => dispatch(back())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAccount);