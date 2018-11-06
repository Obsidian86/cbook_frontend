import React, { Component } from 'react';
import '../styles/drawerStyles.css';

class Drawer extends Component{
    constructor(){
        super();
        this.state = ({ 
            drawer: false 
        });
    }
    toggleDrawer = () =>{
        this.setState({
            drawer: !this.state.drawer
        })
    }
    render(){
        return(
            <div className={`actionDrawer ${ this.state.drawer ? "opened" : "" }`}>
                <button onClick={this.toggleDrawer}>+</button>
            </div>
        )
    }
}

export default Drawer;