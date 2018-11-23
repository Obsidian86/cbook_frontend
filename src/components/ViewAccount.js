import React, { Component } from 'react';
import { convMoney } from '../helper/money'
import { connect } from 'react-redux';

class ViewAccount extends Component {  

    back = () => {
        this.props.dispatch({
            type: "HOME PAGE"
        });
    }
    toggleOptions = (target) =>{ 
        if(document.getElementById(target).classList.contains("show")){
            document.getElementsByClassName("show")[0].classList.remove("show");
        }else{
            if( document.getElementsByClassName("show").length > 0){
                document.getElementsByClassName("show")[0].classList.remove("show");
            } 
            document.getElementById(target).classList.add("show");
        }
    }

    deleteTransaction = (transaction, accountId) =>{
        this.props.dispatch({
            type: "DELETE_TRANSACTION",
            payload: {
                accountId,
                transaction
            }
        });
    }

    render(){
        let {name, desc, balance, transactions, id } = this.props.accountView;
        return(
            <div>
                <div className='displayList'>
                    <div className="column">
                        <button onClick={ this.back }>Back</button>
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
                                <button className="red" onClick={ () =>this.deleteTransaction(index, id ) } >delete</button>
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