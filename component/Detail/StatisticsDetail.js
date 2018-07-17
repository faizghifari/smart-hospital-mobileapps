import React, {Component} from 'React'
import {View,Text,StatusBar,ImageBackground,TouchableOpacity,StyleSheet} from 'react-native'
import {Button, DatePicker} from 'native-base'
import Chart from './../Chart/Chart.js'
import {MIcon as Icon} from './../Utilities/Icon.js';

const styles=StyleSheet.create({
  button:{
    marginTop:20,
    marginLeft:'15%',
    marginRight:'15%',
    padding:10,
    backgroundColor:'rgba(0, 0, 0, 0)',
    borderColor:'white',
    borderRadius:10,
    borderWidth:1,
  },
  buttonEmail:{
    marginTop:20,
    padding:10,
    backgroundColor:'rgba(0, 0, 0, 0)',
    borderColor:'white',
    borderRadius:10,
    borderWidth:1,
  },
  buttonText:{
    fontSize:13,
    color:'white',
    textAlign:'center'
  },
  form:{
    marginLeft:0,
  }
});

export default class StatisticsDetail extends Component{
  constructor(props){
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  render(){
    console.log('ini', this.props.data);
    return(
      <View style={{flex:0.9,flexDirection:'column'}}>
        <View style={{flex:0.75,flexDirection:'column'}}>
          <Chart data={this.props.data}/>
        </View>
        <View style={{flex:0.25, flexDirection:'column'}}>
          <View>
            <Text style={styles.buttonText}>{this.props.type} - {this.props.date}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Generate Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
