import React, {Component} from 'React'
import {View,
        Text,
        StyleSheet,
        StatusBar,
        ScrollView
}from 'react-native';
import Cookie from 'react-native-cookie';
import StatisticsDetail from './../../Statistics/StatisticsDetail.js'

const styles = StyleSheet.create({
  button:{
    flex:0.4,
    opacity:0.8,
    borderRadius:20,
    flexDirection:'column',
    alignItems:'center',
  },
  rowContainer:{
    paddingTop:10,
    paddingBottom:10,
    flexDirection:'row',
    justifyContent:'space-around',
  }
})

export default class StartMenuMOH extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const data = [ 50, 10, 40];
    console.log()
    return(
      <View style={{flex:1, flexDirection: 'column', backgroundColor:'#3CC8AD'}}>
        <StatusBar
          backgroundColor="#1abc9c"
          animated={true}
          barStyle='light-content'
        />
        <View style={{flex:0.10, justifyContent:'center'}}>
          <Text style={{fontSize:20,color:'white', textAlign:'center'}}>Today Malaysia Statistics{'\n'}</Text>
        </View>
        <ScrollView style={{flex:0.90}}>
          <StatisticsDetail data={data}/>
        </ScrollView>
      </View>
    )
  }
}
