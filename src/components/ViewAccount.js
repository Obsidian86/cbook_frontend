import React from 'react';
import { convMoney } from '../helper/money'

const ViewAccount = (props) =>{  
    let {name, desc, balance, transactions } = props.account;

    return(
        <div>
            <div className='displayList'>
                <button>Back</button>
                <h2>{ name }</h2>
                <button>settings</button>
                <p>{ desc }</p>
                <p>{ balance }</p>
                 
                { transactions.reverse().map((tran, index)=> (
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

export default ViewAccount;