import React, {Component} from 'React'
import {View,
        Text,
        StyleSheet,
        TouchableOpacity,
        StatusBar,
        ImageBackground
}from 'react-native';
import {Button,
}from 'native-base';
import {MIcon as Icon} from './../Utilities/Icon.js';

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
    flexDirection:'row',
    justifyContent:'space-around',
  }
})

export default class StartMenu extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={{flex:1, flexDirection: 'column', backgroundColor:'#1abc9c'}}>
        <StatusBar
          backgroundColor="#1abc9c"
          animated={true}
          barStyle='light-content'
        />
        <View style={{flex:0.25, justifyContent:'flex-end'}}>
          <Text style={{fontSize:20,color:'white', textAlign:'center'}}>Welcome <Text style={{fontWeight:'bold'}}>Dr. Dzulkefly Ahmad{'\n'}</Text></Text>
          <Text style={{fontSize:18,color:'white', textAlign:'center'}}>Minister of Health</Text>
        </View>
        <View style={{flex:0.6, justifyContent:'space-around', flexDirection:'column',}}>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={this.props.changeMenu.bind(this,1)} style={[styles.button,{backgroundColor:'#3498db'}]}>
              <View style={styles.iconContainer}>
                <Icon style={styles.iconStyle} family="FontAwesome" name="line-chart" />
              </View>
              <Text style={styles.iconText}>Statistics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:'#f1c40f'}]}>
              <View style={styles.iconContainer}>
                <Icon style={styles.iconStyle} family="FontAwesome" name="desktop" />
              </View>
              <Text style={styles.iconText}>Assets Management</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={this.props.changeMenu.bind(this,2)} style={[styles.button,{backgroundColor:'#e74c3c'}]}>
              <View style={styles.iconContainer}>
                <Icon style={styles.iconStyle} family="FontAwesome" name="qrcode" />
              </View>
              <Text style={styles.iconText}>Scan QR/Barcode</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.changeMenu.bind(this,3)} style={[styles.button,{backgroundColor:'#9b59b6'}]}>
              <View style={styles.iconContainer}>
                <Icon style={styles.iconStyle} family="MaterialCommunityIcons" name="nfc" />
              </View>
              <Text style={styles.iconText}>Read NFC/RFID</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={this.props.logout.bind(this)} style={[styles.button,{backgroundColor:'#9b59b6'}]}>
              <View style={styles.iconContainer}>
                <Icon style={styles.iconStyle} family="FontAwesome" name="sign-out" />
              </View>
              <Text style={styles.iconText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
