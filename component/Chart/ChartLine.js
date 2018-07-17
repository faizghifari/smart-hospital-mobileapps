import React, {Component} from 'react';
import {View,Text, StyleSheet
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
    marginTop:10,
    flexDirection:'column',
    flex:0.95,
    backgroundColor: 'white',
    elevation: 3,
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 2,
    marginBottom: 8
  },
  titleText:{
    paddingBottom:5,
    paddingTop:5,
    textAlign:'center',
    fontSize:15,
    fontWeight:'bold'
  },
  legendText:{
    fontSize: 12,
    textAlign:'center',
  }
})


export default class ChartLine extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const xAxisHeight = 30;
    const axesSvg = {fontSize:10,fill:'grey'};
    const verticalContentInset = { top: 10, bottom: 10 };
    return(
      <View style={{flexDirection:'row', justifyContent:'center'}}>
        <View style={styles.cardContainer}>
          <Text style={styles.titleText}>Usage Graph</Text>
          <View style={{flexDirection:'row'}}>
            <View style={{marginLeft:10, marginRight:10,flex:1,borderBottomColor:'black',borderBottomWidth:1}}/>
          </View>
          <View style={{justifyContent:'center', flexDirection:'row'}}>
            <View style={{flex:0.9,flexDirection:'column'}}>

            </View>
          </View>
        </View>
      </View>
    )
  }
}
