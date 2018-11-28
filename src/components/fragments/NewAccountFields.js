import React from 'react';

const NewAccountFields = () => (
        <div>
            <label htmlFor='accountName'>Account name</label>
            <input type='text' id='accountName' name='accountName' className="field" /> 

            <label htmlFor='startingBalance'>Starting balance</label>
            <input type='text' id='startingBalance' name='startingBalance' className="field" />

            <label htmlFor='description' >Description</label>
            <input type='text' id='description' name='description' className="field" />
        </div>
    );

export default NewAccountFields;