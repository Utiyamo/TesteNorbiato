import React, { Component } from 'react';
import './App.css';

import Formulario from './Components/Formulario';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div>
        <Formulario />
      </div>
    );
  }
}

export default App;
