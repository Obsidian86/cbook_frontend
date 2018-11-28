import React from 'react';
import { todayDate } from '../../helper/date'; 
 
const NewTransactionsFields = (props) => (
        <div> 
            <label htmlFor='payee'>Payee</label>
            <input type='text' id='payee' name='payee' className="field"/> 

            <p className='f_choice setDeposit choice' onClick={(event) => props.setChoice(event)}>Deposit</p>
            <p className='f_choice setDeposit setFalse' onClick={(event) => props.setChoice(event)}>withdrawl</p>

            <label htmlFor='date'>Amount</label>
            <input type='text' id='amount' name='amount' className="field" />

            <label htmlFor='date'>Date</label>
            <input type='text' id='date' name='date' defaultValue={ todayDate() } />
 
            <p className='f_choice setCleared choice field' onClick={(event) => props.setChoice(event)}>Cleared</p>
            <p className='f_choice setCleared setFalse field' onClick={(event) => props.setChoice(event)}>Not cleared</p>
        </div>
    );

export default NewTransactionsFields;