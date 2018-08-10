
'use strict';

import React, { Component } from 'React'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Button
} from 'react-native';


import { Container, Root, Left, Input, Thumbnail, Icon } from "native-base"
import Gradient from 'react-native-linear-gradient';
import Moment from 'moment';
import { RNCamera } from 'react-native-camera';
import Booking from './../Users/Medics/Booking/BookingAsset'

export default class medics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theState: 0
        };

    }
    render() {


        if (this.state.theState == 0) {
            var main = (
                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: 'white', flex: 1.3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{}}>
                            <Icon ios='ios-menu' android="md-menu" style={{ marginTop: 20, marginLeft: 10, color: '#6F6F6F', fontSize: 30 }} />
                        </View>
                        <View>
                            <Text style={{ color: "#6F6F6F", fontSize: 19, fontWeight: 'bold', marginTop: 20, }}>PROFILE</Text>
                        </View>
                        <View style={{}}>
                            <Icon ios='ios-cog' android="md-cog" style={{ marginTop: 20, marginRight: 10, color: '#6F6F6F', fontSize: 30 }} />
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#85D0CC', flex: 4, justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Thumbnail style={{ width: 100, height: 100, borderRadius: 50 }} source={require('./../../images/avatar/engA.jpg')} />
                            <Text style={{ color: "white", marginTop: 22, fontWeight: 'bold', fontSize: 17 }}>Dr. Reyhan Danu</Text>
                            <Text style={{ color: "white", fontSize: 15 }}>Cardiologist</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', flex: 5, justifyContent: 'center', alignItems: 'center' }}  > 
                        <TouchableOpacity style={[styles.button, { marginBottom: 10 }]} onPress={() => this.setState({ theState: 3 })}>
                            <Text style={styles.buttonText}>BOOKING ASSET</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => this.setState({ theState: 1 })} >
                            <Text style={styles.buttonText}>REPORT ASSET</Text>
                        </TouchableOpacity>
                        <View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#85D0CC', flex: 1 }}>
                    </View>
                </View>
            )
        }

        else if (this.state.theState == 1) {
            var main = (
                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white' }}>SCAN QR ASSET</Text>
                    </View>
                    <View style={styles.container2}>
                        <RNCamera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            style={styles.preview}
                            type={RNCamera.Constants.Type.back}
                            flashMode={RNCamera.Constants.FlashMode.on}
                            permissionDialogTitle={'Permission to use camera'}
                            permissionDialogMessage={'We need your permission to use your camera phone'}
                            barCodeTypes={[RNCamera.Constants.BarCodeType.qr, RNCamera.Constants.BarCodeType.code128]}
                            onBarCodeRead={(e) => {
                                this.setState({
                                    assetID: e.data,
                                    assetName: 'Ultrasound'
                                    //  theState: 1
                                })
                                //window.alert(e.data)
                            }}
                        />
                    </View>
                    <TouchableOpacity style={{ flex: 0.5,  backgroundColor: '#8AC7C3', justifyContent:'center' }} onPress={() => this.setState({ theState: 2 })} >
                        <Text style={{ color: 'white' }}> Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.5,  backgroundColor: '#8AC7C3' }} onPress={()=> this.setState({theState:0})} >
                        <Text style={{ color: 'white' }}> Back</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        else if (this.state.theState == 2) {
            var main = (
                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white' }}>REPORT DETAIL</Text>
                    </View>
                    <View style={{ flex: 1, marginTop: 20, backgroundColor: '#8AC7C3', width:"80%" }}>
                        <Text style={{ color: 'white', fontSize:17 }}>Req. Serial Number : {this.state.assetID} </Text>
                        <TextInput style={{ color: 'white', borderBottomWidth: 1, borderBottomColor: 'white', marginBottom:40, fontSize:15 }}></TextInput>
                        <Text style={{ color: 'white', fontSize:17, marginTop:10  }}>Description : {this.state.assetID} </Text>
                        <TextInput style={{ color: 'white', borderBottomWidth: 1,  borderBottomColor: 'white', marginBottom:40, fontSize:15   }}></TextInput>
                        <Text style={{ color: 'white', fontSize:17 , marginTop:10  }}>Details : {this.state.assetID} </Text>
                        <TextInput  multiline = {true}    numberOfLines = {4} style={{ color: 'white', borderBottomWidth: 1,  borderBottomColor: 'white', marginBottom:40, fontSize:15,   }}></TextInput>
                        
                    </View>
                    <TouchableOpacity style={{ flex: 1 ,justifyContent:'center'}} onPress={() => this.setState({ theState: 1 })} >
                        <Text style={{ color: 'white' }}> Next</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        else if(this.state.theState == 3)
        {
            var main = (
                <Booking/>
            )
        }


        return (
            <Root>
                <Gradient
                    colors={['#8AC7C3', '#8AC7C3']}
                    style={{ flex: 1, flexDirection: 'column' }}>
                    <KeyboardAvoidingView behavior="padding" style={styles.containerKeyboard}>
                        {main}
                    </KeyboardAvoidingView>
                </Gradient>
            </Root>

        );
    }
}

var styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    buttonText: {
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        margin: 20
    },
    button: {
        backgroundColor: '#85D0CC',
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        height: '20%',
        width: '60%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    containerKeyboard: {
        flex: 1
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    container2: {
        flex: 1.3,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderColor: 'white',
        width: 250,
        borderWidth: 1
    },


});

