import React, {Component} from 'React'
import {View,
        Text,
        StyleSheet,
        TouchableOpacity,
        StatusBar,
        ImageBackground,
        ScrollView
}from 'react-native';
import Cookie from 'react-native-cookie';
import {MIcon as Icon} from './../../Reuseable/Utilities/Icon.js';
import StatisticsDetail from './../../Statistics/StatisticsDetail.js'

const styles = StyleSheet.create({
  button:{
    flex:0.4,
    opacity:0.8,
    borderRadius:20,
    flexDirection:'column',
    alignItems:'center',
  },
  iconStyle:{
    color: 'white',
    fontSize: 30,
    padding: 20,
    paddingBottom: 5,
  },
  iconText:{
    fontSize: 17,
    textAlign:'center',
    padding: 10,
    color:'white'
  },
  rowContainer:{
    paddingTop:10,
    paddingBottom:10,
    flexDirection:'row',
    justifyContent:'space-around',
  }
})

export default class StartMenuManagement extends Component{
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
          <Text style={{fontSize:20,color:'white', textAlign:'center'}}>Today Sultanah Aminah Statistics{'\n'}</Text>
        </View>
        <ScrollView style={{flex:0.90}}>
          <StatisticsDetail data={data}/>
        </ScrollView>
      </View>
    )
  }
}
