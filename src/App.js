import React, { Component } from 'react'; 
import './styles/App.css';
import { connect } from 'react-redux';

import ChooseAccount from './components/ChooseAccount';
import ViewAccount from './components/ViewAccount';
import Header from './components/Header';
import Drawer from './components/Drawer';

class App extends Component { 
  render() {  
    return (
      <div>
        <Header title={this.props.page}/>
        { this.props.page === "All Accounts" ? <ChooseAccount /> : <ViewAccount account={ this.props.accountView } /> }
        <Drawer />
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{ page: state.page, accountView: state.accountView  }
}

export default connect(mapStateToProps)(App);
