import React from 'react';

const Header = () => {
        let page = "All Accounts";
    return(
        <div className='header'>
            <h3>CheckBook - {page}</h3>
        </div>
    );
}

export default Header;