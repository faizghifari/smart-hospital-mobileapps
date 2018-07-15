import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import ini penting tahu, cek view text stylesheet ini di react-native


export default class Splash extends Component {
  render(){
    return (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}> Smart Hospital </Text>
        </View>
        <View>
          <Text style={styles.subtitle}>  Powered by React Native </Text>
        </View>
      </View>
    );
  }
}

//ini kenpaa dengan stylesheer
const styles = StyleSheet.create ({
  wrapper: {
     backgroundColor: '#2980b9',
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold'
  },
  subtitle: {
    color: 'white',
    fontWeight: '200',
    paddingBottom: 20
  },
  titleWrapper: {
    justifyContent: 'center',
    flex: 1
  }
});
