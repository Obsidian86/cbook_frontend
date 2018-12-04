import React, { Component } from 'react'; 
import './styles/App.css';
import { connect } from 'react-redux';

import ChooseUser from './components/ChooseUser';
import ChooseAccount from './components/ChooseAccount';
import ViewAccount from './components/ViewAccount';
import Header from './components/Header';
import Drawer from './components/Drawer';

class App extends Component { 
  render() {
    let component;
    switch(this.props.page){
      case "All Accounts":
        component = <ChooseAccount />
        break;
      case "View Account":
        component = <ViewAccount />
        break;
      default: 
        component = <ChooseUser />
        break;
    }
    return (
      <div>
        <Header title={this.props.page}/>
        { component }
        { this.props.page !== "Log In" && <Drawer /> }
      </div>
    );
  }
}

const mapStateToProps = (state)=>({ page: state.page });

export default connect(mapStateToProps)(App);
