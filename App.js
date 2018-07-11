'use strict';

import React, { Component } from 'react';
import {Root,StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import Login from './Login.js';
import LoggedIn from './component/Menu/StartMenu.js';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedIn:false
    }
  }


  render() {
    if(!this.state.loggedIn){
      var main=(
        <Login/>
      )
    }else{
      var main=(
        <LoggedIn/>
      )
    }
    return (
      <StyleProvider style={getTheme(commonColor)}>
        {main}
      </StyleProvider>
    );
  }
}
