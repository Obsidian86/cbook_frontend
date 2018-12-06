import React from 'react';

const style = {  
    "width": "90%", 
    "margin": "0 auto",
    "padding": "5px 0",
    "borderBottom": "1px solid gray"
}
const sStyle= {
    "paddingBottom": "25px",
    "color": "green"
}
const iStyle = { 
    "border": "2px solid blue",
    "height": "35px",
    "width": "44px",
    "borderRadius": "50%",
    "transform": "rotate(80deg)", 
    "paddingTop":"5px",
    "color": "blue",
    "marginLeft": "40px",
    "marginTop": "20px"
}

const UserBar = (props)=>{
    return(  
        <span style={style} className="column">
            <i style={iStyle}>:)</i>
            <strong style={sStyle}> {props.title} </strong>  
        </span>
    );
}

export default UserBar;