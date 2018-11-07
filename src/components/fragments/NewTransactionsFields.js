import React from 'react';


let date = new Date();

const NewTransactionsFields = () => (
        <div> 
            <label htmlFor='payee'>Payee</label>
            <input type='text' id='payee' name='payee' /> 

            <label htmlFor='date'>Amount</label>
            <input type='text' id='amount' name='amount' />

            <label htmlFor='date'>Date</label>
            <input type='text' id='date' name='date' defaultValue={ `${date.getMonth() + 1}-${date.getDate() }-${date.getFullYear()}` } />

            <label htmlFor='cleared' >Cleared?</label>
            <select name="cleared" id="cleared">
                <option value='yes'>Yes</option>
                <option value='yes'>no</option>
            </select> 
        </div>
    );

export default NewTransactionsFields;