import React, {Component} from 'react';
import {View,Text, StyleSheet, Button
} from 'react-native';
import {Bar} from 'react-native-pathjs-charts';

styles = StyleSheet.create({
  cardContainer:{
    marginTop:10,
    flexDirection:'column',
    flex:0.8,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    elevation: 3,
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOpacity: 1.0,
    shadowRadius: 2,
    marginBottom: 8,
    marginRight: 55,
    marginLeft: 55
  },
  titleText:{
    paddingBottom:5,
    paddingTop:5,
    textAlign:'center',
    fontSize:15,
    fontWeight:'bold',
    color: 'white'
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
        "name": "Security"
      }]
    ]

    let options = {
      height: 150,
      width: 150,
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
          fill: '#fff'
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
          fill: '#fff'
        }
      }
    }
    if(this.state.detail=='chart'){
      var main=(
        <View style={{flexDirection:'row',justifyContent:'space-around', height:100}}>
          <View style={styles.detail}>
            <View style={styles.textDetail}>
              <Text>  </Text>
            </View>
            <View style={styles.textDetail}>
              <Text style={{color:'white'}} >Safety</Text>
            </View>
            <View style={styles.textDetail}>
              <Text style={{color:'white'}} >Security</Text>
            </View>
          </View>

          <View style={styles.detail}>
            <View style={styles.textDetail}>
              <Text style={{color:'white'}} >Current</Text>
            </View>
            <View style={styles.textDetail}>
              <Text style={{color:'white'}} >{this.props.data[0]}</Text>
            </View>
            <View style={styles.textDetail}>
              <Text style={{color:'white'}} >{this.props.data[1]}</Text>
            </View>
          </View>

          <View style={styles.detail}>
            <View style={styles.textDetail}>
              <Text style={{color:'white'}} >Ideal</Text>
            </View>
            <View style={styles.textDetail}>
              <Text style={{color:'white'}}>50</Text>
            </View>
            <View style={styles.textDetail}>
              <Text style={{color:'white'}} >50</Text>
            </View>
          </View>
          
          <View style={styles.detail}>
            <View style={styles.textDetail}>
              <Text style={{color:'white'}} >Condition</Text>
            </View>
            <View style={styles.textDetail}>
              <Text style={{color:'green'}}>Good</Text>
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
          {'r':46,'g':204,'b':113},
          {'r':241,'g':196,'b':15} //rgb(241, 196, 15)
        ]}/>
      )
    }
    return (
      <View style={{flexDirection:'row', justifyContent:'center'}}>
        <View style={styles.cardContainer}>
          <Text style={styles.titleText}>Statistics</Text>
          <View style={{flexDirection:'row'}}>
            <View style={{marginLeft:10, marginRight:10,flex:1,borderBottomColor:'white',borderBottomWidth:1}}/>
          </View>
          <View style={{justifyContent:'center', flexDirection:'row'}}>
            <View style={{flex:0.9,flexDirection:'column', justifyContent:'center'}}>
              {main}
              <View style={{paddingBottom:10}}>
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
      </View>
    )
  }
}
