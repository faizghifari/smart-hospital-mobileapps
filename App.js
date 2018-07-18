/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Login from './src/components/Login/LoginForm';

import {Root,StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import Moh from './src/components/Users/MOH';
import Menu from './src/components/Menu/Menu';

export default class App extends Component {
  
  constructor(props){
    super(props);
    this.selectPage = this.selectPage.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.state={
      selectedState:0,
      username: ""
    }
  }

  selectPage(i){
    this.setState({
      selectedState: i
    })
  }

  updateUsername(i){
    this.setState({
      username: i
    })
  }
  
  render() {
    if(this.state.selectedState==0){
      var main=(
        <Login selectPage = {this.selectPage.bind(this)} updateUsername = {this.updateUsername.bind(this)}> username ={this.state.username}  </Login>
      )
    }
    
    else if(this.state.selectedState==1){
      var main=(
        <Menu selectPage = {this.selectPage.bind(this)}>  </Menu>
        //<Moh selectPage = {this.selectPage.bind(this)}>  </Moh>
      )
    }

    else if(this.state.selectedState==2){
      var main=(
        <Moh selectPage = {this.selectPage.bind(this)}>  </Moh>
      )
    }


    return (
      <StyleProvider style={getTheme(commonColor)}>
        {main}
      </StyleProvider>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
