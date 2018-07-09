import React, {Component} from 'react';
import {StyleSheet,
        View,
        Text
} from 'react-native';

styles = StyleSheet.create({
  mainPage:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#F0F0F0',
    justifyContent:'center',
    alignItems:'center',
  },
  cardContainer:{
    justifyContent:'center',
    flex:0.95,
    backgroundColor: 'white',
    elevation: 3,
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 2,
  }
})

export default class PPM extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={styles.mainPage}>
        <View style={{flexDirection:'row'}}>
          <View style={styles.cardContainer}>
            <Text>asdadassda</Text>
          </View>
        </View>
      </View>
    )
  }
}
