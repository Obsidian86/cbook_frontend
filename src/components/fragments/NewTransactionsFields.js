import React from 'react';
import { todayDate } from '../../helper/date';
 
const NewTransactionsFields = () => (
        <div> 
            <label htmlFor='payee'>Payee</label>
            <input type='text' id='payee' name='payee' /> 

            <label htmlFor='date'>Amount</label>
            <input type='text' id='amount' name='amount' />

            <label htmlFor='date'>Date</label>
            <input type='text' id='date' name='date' defaultValue={ todayDate() } />

            <label htmlFor='cleared' >Cleared?</label> 
            <input type='checkbox' name='cleared' id="cleared" value="yes" checked="true" /> &nbsp; Yes
        </div>
    );

export default NewTransactionsFields;