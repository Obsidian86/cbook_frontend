import React from 'react';
import { convMoney } from '../../helper/money';

const AccountCard = ({account}) =>{ 
    return(
        <div>
            <div className="mainLine">
                <p>{ account.name }</p>
                <p>{ convMoney(account.balance) } </p>
            </div>
            <p>{ account.desc }</p>
        </div>
    );
}

export default AccountCard;