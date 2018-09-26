import React, { Component } from 'React'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Container, Left, Content, Button, Icon
} from 'native-base';

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        marginLeft: '15%',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderRadius: 10,
        borderWidth: 1,
        flexDirection:'row',
        alignItems:'center'
    },
    iconStyle: {
        marginLeft: 10,
        color: 'white',
        fontSize: 26
    },
    iconText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        color: 'white'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: '700'
    }
})

export default class SideBarEngineer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theState: 0
        }
    }

    render() {
        const data = [39, 14];
            var main = (
              <View style={{flex:1,flexDirection:'column'}}>
                <View style={{ flex: 0.30, justifyContent: 'center' }} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                        <Text style={{ color: "white", marginTop: 20,fontWeight:'bold',fontSize:16 }}>Ir. Reyhan Danu</Text>
                        <Text style={{ color: "white", fontSize:13 }}>Enginner</Text>
                        <Text style={{ color: "white", fontSize:13 }}>Mail@email.com</Text>
                    </View>
                </View>
                <View style={{ flex: 0.70,flexDirection:'row' }}>
                  <View style={{flex:0.9,justifyContent:'center',flexDirection:'column'}}>
                    <TouchableOpacity style={[styles.button,{borderColor:'white'}]} onPress={this.props.changeMenu.bind(this, 0)}>
                      <Icon ios='ios-home' android="md-home" style={styles.iconStyle} /><Text style={styles.buttonText}> Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{borderColor:'orange'}]} onPress={this.props.changeMenu.bind(this, 7)}>
                      <Icon ios='ios-list' android="md-list" style={styles.iconStyle} /><Text style={styles.buttonText}> Asset List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{borderColor:'skyblue'}]} onPress={this.props.changeMenu.bind(this, 5)}>
                      <Icon ios='ios-clock' android="md-clock" style={styles.iconStyle} /><Text style={styles.buttonText}> History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{borderColor:'#a29bfe'}]} onPress={this.props.changeMenu.bind(this, 8)}>
                      <Icon ios='ios-document' android="md-document" style={styles.iconStyle} /><Text style={styles.buttonText}> Issue Report</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{borderColor:'white'}]} onPress={this.props.changeMenu.bind(this, 9)}>
                      <Icon style={styles.iconStyle} family="FontAwesome" name="map" /><Text style={styles.buttonText}> Manual Assign Map</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{borderColor:'white'}]} onPress={this.props.logout.bind(this)}>
                      <Icon ios='ios-log-out' android="md-log-out" style={styles.iconStyle} /><Text style={styles.buttonText}> Logout</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
        return (
          <View style={{backgroundColor:'#2f353a',flex:1}}>
              {main}
          </View>
        )
    }
}
