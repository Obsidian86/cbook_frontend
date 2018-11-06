import React, { Component } from 'react'; 
import './styles/App.css';

import ChooseAccount from './components/ChooseAccount';
import Header from './components/Header';
import Drawer from './components/Drawer';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ChooseAccount />
        <Drawer />
      </div>
    );
  }
}

export default App;
