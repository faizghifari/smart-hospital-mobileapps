
'use strict';

import React, { Component } from 'React'
var t = require('tcomb-form-native');
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Button
} from 'react-native';


import { Container, Root, Toast, Input, Item, Icon } from "native-base"
import Gradient from 'react-native-linear-gradient';
import Moment from 'moment';
import { RNCamera } from 'react-native-camera';

export default class workOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomID: '',
            assetID: '',
            assetName: '',
            theState: 0
        };

    }
    render() {
        if (this.state.theState == 0) {
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
                    <View style={{ flex: 0.5, marginTop: 20, backgroundColor: '#8AC7C3' }}>
                        <Text style={{ color: 'white' }}>Asset ID: {this.state.assetID} </Text>
                    </View>
                    <TouchableOpacity style={{ flex: 0.5}} onPress={() => this.setState({ theState: 1 })} >
                        <Text style={{ color: 'white' }}> Next</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        else if (this.state.theState == 1) {
            var main = (
                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#0984e3' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white' }}>SCAN QR ROOM</Text>
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
                                    bookID: e.data,
                                })
                                //window.alert(e.data)
                            }}
                        />
                    </View>
                    <View style={{ flex: 0.5, marginTop: 20, backgroundColor: '#0984e3' }}>
                        <Text style={{ color: 'white' }}>Room ID: {this.state.bookID} </Text>
                    </View>
                    <TouchableOpacity style={{ flex: 0.25,  backgroundColor: '#0984e3' }} onPress={() => this.setState({ theState: 2 })} >
                        <Text style={{ color: 'white' }}> Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.25,  backgroundColor: '#0984e3' }} onPress={()=> this.setState({theState:0})} >
                        <Text style={{ color: 'white' }}> Back</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        else if (this.state.theState == 2) {
            var main = (
                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#b2bec3' }}>SUMMARY</Text>
                    </View>
                    <View style={[styles.container2, {backgroundColor: "#dfe6e9"}]}>
                        <Text style={{marginTop: 20, marginLeft:20}}>Asset ID       : {this.state.assetID}</Text>
                        <Text style={{marginTop: 10, marginLeft:20}}>Asset Name : {this.state.assetName}</Text>
                        <Text style={{marginTop: 10, marginLeft:20}}>Room ID       : {this.state.bookID}</Text>
                    </View>
                    <TouchableOpacity style={{ flex: 0.5, marginTop: 20, backgroundColor: 'white' }} onPress={()=>this.setState({bookID:"", assetID:"", assetName:""})}>
                        <Text style={{ color: 'black' }}>Remove? </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.25,  backgroundColor: 'white' }} onPress={() => this.setState({ theState: 2 })} >
                        <Text style={{ color: 'black' }}> Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.25,  backgroundColor: 'white' }} onPress={()=> this.setState({theState:1})} >
                        <Text style={{ color: 'black' }}> Back</Text>
                    </TouchableOpacity>
                </View>
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
        fontSize: 13,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: 'white',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 6,
        justifyContent: 'center',
        height:'20%'
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

