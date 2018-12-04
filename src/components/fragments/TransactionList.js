import React from 'react'; 
import { convMoney } from '../../helper/money' 

const TransactionList = (props) =>{
    return(
         props.transactions.map((tran, index)=> (
            <div key={index} id={`t${index}`} className="interact" onClick={() => props.toggleOptions(`t${index}`) }>
                <div className="mainLine">
                    <p>{ tran.payee } </p>
                    <p className={ tran.amount >= 0 ? "add" : "subtract" } >{ convMoney(tran.amount) }</p>
                </div>
                <div className="column">
                    <p>{tran.date}</p>
                    <p>{tran.cleared === "yes" ? "cleared" : "not cleared"}</p>
                </div>
                <div className="options">
                    <button className="green" onClick={()=>{ props.setUpdateTransaction(tran) }} >update</button>
                    <button className="red" onClick={ () => props.deleteTransaction(props.accountId, tran._id) } >delete</button>
                </div>
            </div>
        ))
    );
} 
export default TransactionList; 