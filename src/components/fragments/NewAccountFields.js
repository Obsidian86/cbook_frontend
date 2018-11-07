import React from 'react';

const NewAccountFields = () => (
        <div>
            <label htmlFor='accountName'>Account name</label>
            <input type='text' id='accountName' name='accountName' /> 

            <label htmlFor='startingBalance'>Starting balance</label>
            <input type='text' id='startingBalance' name='startingBalance' />

            <label htmlFor='description' >Description</label>
            <input type='text' id='description' name='description' />
        </div>
    );

export default NewAccountFields;