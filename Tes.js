
'use strict';

import React, { Component } from 'React'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    Button
} from 'react-native';


import { Container, Root, Left, Input, Thumbnail, Icon } from "native-base"
import Gradient from 'react-native-linear-gradient';
import Moment from 'moment';
import { RNCamera } from 'react-native-camera';
import Booking from './src/components/Users/Medics/Booking/BookingAsset'

export default class workOrder extends Component {
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
                    <View style={{ backgroundColor: 'white', flex: 2, justifyContent: 'flex-end', alignItems: 'center' }} >
                        <View style={{
                            backgroundColor: '#DB4D4D',
                            borderColor: '#FFFFFF',
                            justifyContent: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                        }}>
                            <Text style={styles.buttonText}>ASSET DETAILS</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', flex: 7, justifyContent: 'center', alignItems: 'center' }}  >
                        <View style={[styles.button, { marginBottom: 10, alignItems: 'center' }]} onPress={() => this.setState({ theState: 3 })}>
                            <View>
                                <Image style={{ width: 100, height: 100, margin: 10 }} source={require('./src/images/assets/a.png')} />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, marginLeft: 20 }}>
                                    <Text style={[styles.assetSubtitle, { fontWeight: 'bold' }]}>Asset Condition</Text>
                                    <Text style={[styles.assetSubtitle, { fontWeight: 'bold' }]}>Asset Status</Text>
                                    <Text style={[styles.assetSubtitle, { fontWeight: 'bold' }]}>Asset Usage</Text>
                                    <Text style={[styles.assetSubtitle, { fontWeight: 'bold' }]}>Freq. of breakdowns</Text>
                                    <Text style={[styles.assetSubtitle, { fontWeight: 'bold' }]}>Asset Age</Text>
                                    <Text style={[styles.assetSubtitle, { fontWeight: 'bold' }]}>Obsolescene by</Text>
                                    <Text style={[styles.assetSubtitle, { fontWeight: 'bold' }]}>Safety Alert</Text>
                                    <Text style={[styles.assetSubtitle, { fontWeight: 'bold' }]}>Maintenance Cost</Text>
                                    <Text style={[styles.assetSubtitle, { fontWeight: 'bold' }]}>Avaibility of back up</Text>
                                    <Text style={[styles.assetSubtitle, { fontWeight: 'bold' }]}>User Recommendation</Text>
                                    <Text style={[styles.assetSubtitle, { fontWeight: 'bold' }]}></Text>
                                </View>
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={styles.assetSubtitle}>: Good</Text>
                                    <Text style={styles.assetSubtitle}>: Functioning</Text>
                                    <Text style={styles.assetSubtitle}>: Medium</Text>
                                    <Text style={styles.assetSubtitle}>: 3-4</Text>
                                    <Text style={styles.assetSubtitle}>: >15 Years</Text>
                                    <Text style={styles.assetSubtitle}>: Yes</Text>
                                    <Text style={styles.assetSubtitle}>: Available</Text>
                                    <Text style={styles.assetSubtitle}>: Yes</Text>
                                    <Text style={styles.assetSubtitle}>: No</Text>
                                    <Text style={styles.assetSubtitle}>: Not to replace</Text>
                                    <Text style={styles.assetSubtitle}></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#DB4D4D', flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setState({ theState: 0 })} style={{ flex: 1, borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "white" }}>Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ theState: 1 })} style={{ flex: 1, borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "white" }}>Reason</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ theState: 1 })} style={{ flex: 1, borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "white" }}>Docs</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        else if (this.state.theState == 1) {
            var main = (
                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: 'white', flex: 2, justifyContent: 'flex-end', alignItems: 'center' }} >
                        <View style={{
                            backgroundColor: '#DB4D4D',
                            borderColor: '#FFFFFF',
                            justifyContent: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                        }}>
                            <Text style={styles.buttonText}>REASON</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', flex: 7, justifyContent: 'center', alignItems: 'center', }}  >
                        <View style={[styles.button, { marginBottom: 10, }]} onPress={() => this.setState({ theState: 3 })}>
                            <Text style={[styles.assetSubtitle, { margin: 20 }]}>The asset was found damaged. The connection cable was opened and is dangerous
                        for sorruounding, need to be fixed soon. However, while it is being fixed, it would be better to replace/find the subtitute for the asset, as
                        it is used frequently by doctors.</Text>
                        <TouchableOpacity style={{
                            backgroundColor: '#DB4D4D',
                            borderColor: '#FFFFFF',
                            justifyContent: 'center',
                            shadowColor: '#000',
                            marginTop: 50,
                            marginLeft:40,
                            marginRight:40,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                        }}>
                            <Text style={{
                                fontSize: 17,
                                color: 'white',
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                margin: 20
                            }}>Dispose?</Text>
                        </TouchableOpacity>
                        </View>
                        
                    </View>
                    <View style={{ backgroundColor: '#DB4D4D', flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setState({ theState: 0 })} style={{ flex: 1, borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "white" }}>Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ theState: 1 })} style={{ flex: 1, borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "white" }}>Reason</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ theState: 1 })} style={{ flex: 1, borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "white" }}>Docs</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }



        return (
            <Root>
                <Gradient
                    colors={['#FFFFFF', '#FFFFFF']}
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
        fontSize: 21,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        margin: 20
    },
    button: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        height: '85%',
        width: '80%',
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
    assetSubtitle: {
        color: 'grey',
        marginTop: 10,
        fontSize: 13
    },


});

