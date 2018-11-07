import React from 'react';

const Header = (props) => {
    let page = props.title;
    return(
        <div className='header'>
            <h3>CheckBook - {page}</h3>
        </div>
    );
}

export default Header;