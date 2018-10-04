import React, {Component} from 'react';
import {View,Text, StyleSheet
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
              <View style={{flexDirection: 'row', height:300}}>
                <YAxis
                  data={this.props.data}
                  style={{ marginBottom: xAxisHeight }}
                  contentInset={verticalContentInset}
                  svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <LineChart
                      style={{ flex: 1 }}
                      data={this.props.data}
                      contentInset={verticalContentInset}
                      svg={{ stroke: 'rgb(134, 65, 244)' }}
                  >
                      <Grid/>
                  </LineChart>
                  <XAxis
                      style={{ marginHorizontal: -10, height: xAxisHeight }}
                      data={this.props.data}
                      formatLabel={(value, index) => index}
                      contentInset={{ left: 10, right: 10 }}
                      svg={axesSvg}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',paddingBottom:10}}>
            <View>
              <Text style={styles.legendText}>XAxis:Time </Text>
            </View>
            <View>
              <Text style={styles.legendText}>YAxis:Ships </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
