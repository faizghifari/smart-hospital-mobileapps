import React, { Component } from 'React'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    ScrollView
} from 'react-native';
import {
    Container, Header, Left, Body, Right, Title, Content, CardItem, Card, Button, Badge, Drawer, Thumbnail
} from 'native-base';
import {MIcon as Icon} from './../../Utilities/Icon.js';



import Gradient from 'react-native-linear-gradient';
const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        marginLeft: '15%',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderRadius: 10,
        borderWidth: 3,
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

export default class SideBarMOH extends Component {
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
                        <Text style={{ color: "white", marginTop: 20,fontWeight:'bold',fontSize:16 }}>Minister of Health</Text>
                    </View>
                </View>
                <View style={{ flex: 0.70,flexDirection:'row' }}>
                  <View style={{flex:0.9,justifyContent:'center',flexDirection:'column'}}>
                    <TouchableOpacity style={[styles.button,{borderColor:'#1abc9c'}]} onPress={this.props.changeMenu.bind(this, 0)}>
                      <Icon name="home" style={styles.iconStyle} /><Text style={styles.buttonText}> Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{borderColor:'#3498db'}]} onPress={this.props.changeMenu.bind(this, 1)}>
                      <Icon style={styles.iconStyle} family="FontAwesome" name="line-chart" /><Text style={styles.buttonText}> Statistics</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{borderColor:'#e74c3c'}]} onPress={this.props.changeMenu.bind(this, 2)}>
                      <Icon style={styles.iconStyle} family="FontAwesome" name="qrcode" /><Text style={styles.buttonText}> QR Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{borderColor:'#a29bfe'}]} onPress={this.props.changeMenu.bind(this, 3)}>
                      <Icon style={styles.iconStyle} family="MaterialCommunityIcons" name="nfc" /><Text style={styles.buttonText}> NFC Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{borderColor:'#9b59b6'}]} onPress={this.props.changeMenu.bind(this, 4)}>
                      <Icon style={styles.iconStyle} family="FontAwesome" name="desktop" /><Text style={styles.buttonText}> Asset Management</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{borderColor:'#F09819'}]} onPress={this.props.changeMenu.bind(this, 5)}>
                      <Icon style={styles.iconStyle} family="FontAwesome" name="map" /><Text style={styles.buttonText}> Tracker</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{borderColor:'#3498db'}]} onPress={this.props.changeMenu.bind(this, 6)}>
                      <Icon style={styles.iconStyle} family="FontAwesome" name="file" /><Text style={styles.buttonText}> Issue Report</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{borderColor:'#17AFA0'}]} onPress={this.props.changeMenu.bind(this, 7)}>
                      <Icon style={styles.iconStyle} family="FontAwesome" name="lock" /><Text style={styles.buttonText}> Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{borderColor:'white'}]} onPress={this.props.logout.bind(this)}>
                      <Icon style={styles.iconStyle} family="FontAwesome" name="sign-out" /><Text style={styles.buttonText}> Logout</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
        return (
          <ScrollView style={{backgroundColor:'#2f353a',flex:1}}>
              {main}
          </ScrollView>
        )
    }
}
