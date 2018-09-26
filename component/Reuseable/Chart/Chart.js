import React, {Component} from 'react';
import {View,Text, StyleSheet, Button,Dimensions
} from 'react-native';

import {Bar} from 'react-native-pathjs-charts';



styles = StyleSheet.create({
  cardContainer:{
    marginTop:10,
    flexDirection:'column',
    flex:0.95,
    backgroundColor: '#3498db',
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
  },
  detail:{
    flex:0.25,
    flexDirection:'column',
  },
  textDetail:{
    flex:0.25
  }
})

const {height, width} = Dimensions.get('window');

export default class Chart extends Component{
  constructor(props){
    super(props);
    this.state={
      detail:"detail"
    }
  }
  detailHandle(){
    if(this.state.detail=='detail'){
      this.setState({
        detail:'chart'
      })
    }else{
      this.setState({
        detail:'detail'
      })
    }
  }
  render() {
    let data = [
      [{
        "v": this.props.data[0],
        "name": "Safety"
      },
      {
        "v": this.props.data[1],
        "name": "Productivity"
      },
      {
        "v": this.props.data[2],
        "name": "Security"
      }]
    ]

    let options = {
      height: width*0.7,
      width: width*0.7,
      margin: {
        top: 20,
        left: 25,
        bottom: 50,
        right: 20
      },
      color: '#e67e22',
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }
    if(this.state.detail=='chart'){
      var main=(
        <View style={{flexDirection:'row',justifyContent:'space-around', height:width*0.8,padding:10}}>
          <View style={styles.detail}>
            <View style={styles.textDetail}>
              <Text>  </Text>
            </View>
            <View style={styles.textDetail}>
              <Text>Safety</Text>
            </View>
            <View style={styles.textDetail}>
              <Text>Productivity</Text>
            </View>
            <View style={styles.textDetail}>
              <Text>Security</Text>
            </View>
          </View>
          <View style={styles.detail}>
            <View style={styles.textDetail}>
              <Text>Current</Text>
            </View>
            <View style={styles.textDetail}>
              <Text>{this.props.data[0]}</Text>
            </View>
            <View style={styles.textDetail}>
              <Text>{this.props.data[1]}</Text>
            </View>
            <View style={styles.textDetail}>
              <Text>{this.props.data[2]}</Text>
            </View>
          </View>
          <View style={styles.detail}>
            <View style={styles.textDetail}>
              <Text>Ideal</Text>
            </View>
            <View style={styles.textDetail}>
              <Text>50</Text>
            </View>
            <View style={styles.textDetail}>
              <Text>50</Text>
            </View>
            <View style={styles.textDetail}>
              <Text>50</Text>
            </View>
          </View>
          <View style={styles.detail}>
            <View style={styles.textDetail}>
              <Text>Condition</Text>
            </View>
            <View style={styles.textDetail}>
              <Text style={{color:'green'}}>Good</Text>
            </View>
            <View style={styles.textDetail}>
              <Text style={{color:'red'}}>Bad</Text>
            </View>
            <View style={styles.textDetail}>
              <Text style={{color:'yellow'}}>Medium</Text>
            </View>
          </View>
        </View>
      )
    }else if(this.state.detail=="detail"){
      var main=(
        <Bar data={data} options={options} accessorKey='v' pallete={[
          {'r':0,'g':125,'b':0},
          {'r':125,'g':0,'b':0},
          {'r':0,'g':60,'b':60},

        ]}/>
      )
    }
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.titleText}>Statistics</Text>
        <View style={{flexDirection:'row'}}>
          <View style={{marginLeft:10, marginRight:10,flex:1,borderBottomColor:'black',borderBottomWidth:1}}/>
        </View>
        <View style={{justifyContent:'center', flexDirection:'row'}}>
          <View style={{flex:0.9,flexDirection:'column', justifyContent:'center', backgroundColor:'white'}}>
            {main}
            <View style={{paddingBottom:10, paddingLeft:5,paddingRight:5}}>
              <Button
                onPress={this.detailHandle.bind(this)}
                title={this.state.detail}
                color="#3498db"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
