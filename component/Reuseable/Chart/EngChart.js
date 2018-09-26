import React, {Component} from 'react';
import {View,Text, StyleSheet, Button
} from 'react-native';
import {Bar} from 'react-native-pathjs-charts';

styles = StyleSheet.create({
  cardContainers:{
    marginTop:10,
    flexDirection:'row',
    flex:0.8,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    elevation: 3,
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOpacity: 1.0,
    shadowRadius: 2,
    marginBottom: 8,
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


export default class EngChart extends Component{
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
        <View style={{flexDirection:'row',justifyContent:'space-around', width:'90%', marginTop: 10}}>
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
      <View style={{flexDirection:'column', justifyContent:'center', marginTop: 40}}>
        <Text style={styles.titleText}>Statistics</Text>
        <View style={styles.cardContainers}>
          <View style={{flexDirection:'row'}}>
            <View style={{marginLeft:10, marginRight:10,flex:1,borderBottomColor:'white',borderBottomWidth:1}}/>
          </View>
          <View style={{justifyContent:'center', flexDirection:'column'}}>
             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              {main}
            </View>
            <View style={{paddingBottom:10}}>
                <Button
                  onPress={this.detailHandle.bind(this)}
                  title="Detail"
                  color="green"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
          </View>
        </View>
      </View>
    )
  }
}
