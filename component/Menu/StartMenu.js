import React, {Component} from 'React'
import {View,
        Text,
        StyleSheet,
        TouchableOpacity
}from 'react-native';

import {Button,
}from 'native-base';
import {MIcon as Icon} from './../Utilities/Icon.js';

const styles = StyleSheet.create({
  button:{
    borderRadius: 15,
    borderColor: 'grey',
    borderWidth: 0.5
  },
  iconContainer:{
    padding: 20
  },
  icon:{
    color: 'green',
    fontSize: 20
  },
  iconText:{
    fontSize:15,
    textAlign:'center',
    marginTop:10,
  }
})

export default class StartMenu extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={{flex:1, flexDirection: 'column'}}>
        <View style={{flex:0.3, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:20, fontWeight:'bold',textAlign:'center'}}>Smart Hospital</Text>
        </View>
        <View style={{flex:0.7, flexDirection:'column'}}>
          <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
            <View>
              <TouchableOpacity style={styles.button} onPress={this.props.changeMenu.bind(this,1)}>
                <View style={styles.iconContainer}>
                  <Icon style={styles.icon} family="FontAwesome" name='camera'/>
                </View>
              </TouchableOpacity>
              <Text style={styles.iconText}>PPM</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.button}>
                <View style={styles.iconContainer}>
                  <Icon style={styles.icon} family="FontAwesome" name='camera'/>
                </View>
              </TouchableOpacity>
              <Text style={styles.iconText}>PPM</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
