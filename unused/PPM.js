import React, {Component} from 'react';
import {StyleSheet,
        View,
        Text,
        ListView,
        TouchableOpacity,
} from 'react-native';
import { LineChart, XAxis,YAxis, Grid } from 'react-native-svg-charts';

styles = StyleSheet.create({
  mainPage:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#F0F0F0',
    justifyContent:'center',
    alignItems:'center',
  },
  cardContainer:{
    alignItems:'center',
    flexDirection:'column',
    flex:0.95,
    backgroundColor: 'white',
    elevation: 3,
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 2,
    height: 400
  }
})


export default class PPM extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    const contentInset = { top: 20, bottom: 20 }
    return(
      <View style={styles.mainPage}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={styles.cardContainer}>
            <Text style={{paddingBottom:5, paddingTop:5,textAlign:'center'}}>Johor</Text>
            <View style={{flexDirection:'row'}}>
              <View style={{marginLeft:10, marginRight:10,flex:1,borderBottomColor:'black',borderBottomWidth:1}}/>
            </View>
            <View style={{flex:0.7, justifyContent:'center', flexDirection:'row'}}>
              <View style={{flex:0.9, justifyContent:'center',flexDirection: 'row'}}>
                  <YAxis
                    data={ data }
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}ºC` }
                  />
                  <View style={{flex:1,flexDirection:'column'}}>
                    <LineChart
                      style={{ flex: 1, marginLeft: 16 }}
                      data={ data }
                      svg={{ stroke: 'rgb(134, 65, 244)' }}
                      contentInset={ contentInset }
                    >
                        <Grid/>
                    </LineChart>
                    <XAxis
                      style={{ marginHorizontal: -10 }}
                      data={ data }
                      formatLabel={ (value, index) => index }
                      contentInset={{ left: 20, right: 20 }}
                      svg={{ fontSize: 10, fill: 'black' }}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
