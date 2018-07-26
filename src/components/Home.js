import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, ScrollView, TouchableOpacity, Text, StatusBar, KeyboardAvoidingView } from 'react-native';


import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';
import { RNCamera } from 'react-native-camera';


import Charts from './Charts/HomeChart'

import App from './../../App'

import { Icon } from 'native-base';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginState: 0,
            error: false,
            email: this.props.username,
            password: '',

        };
    }




    selectMain(i) {
        this.setState({
            loginState: i
        })
    }




    render() {
        if (this.state.loginState == 0) {
            var main = (
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'white', textAlign: 'center' }}>SMART HEALTHCARE</Text>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 1)} style={styles.button}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        else if (this.state.loginState == 1) {
            const data = [39, 14, 30];
            var main = (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.15, marginTop: 70 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center' }}>Welcome to</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center' }}>SMART HEALTHCARE</Text>
                    </View>
                    <ScrollView style={{ flex: 0.85 }}>

                        <Charts data={data} />
                        <TouchableOpacity onPress={this.selectMain.bind(this, 2)} style={styles.button}>
                            <Text style={styles.buttonText}>Managements</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            );
        }

        else if (this.state.loginState == 2) {

            var main = (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 3)} style={styles.button}>
                        <Text style={styles.buttonText}>Patient</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 3)} style={styles.button}>
                        <Text style={styles.buttonText}>Assets</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 3)} style={styles.button}>
                        <Text style={styles.buttonText}>Facilities</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 3)} style={styles.button}>
                        <Text style={styles.buttonText}>Environtment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 3)} style={styles.button}>
                        <Text style={styles.buttonText}>Lab</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 3)} style={styles.button}>
                        <Text style={styles.buttonText}>Pharmaceutical</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 3)} style={styles.button}>
                        <Text style={styles.buttonText}>Inventory</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 3)} style={styles.button}>
                        <Text style={styles.buttonText}>Dietary</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 3)} style={styles.button}>
                        <Text style={styles.buttonText}>Cleaning</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 3)} style={styles.button}>
                        <Text style={styles.buttonText}>Waste</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 3)} style={styles.button}>
                        <Text style={styles.buttonText}>Stakeholder</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else if (this.state.loginState == 3) {

            var main = (
                <View>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 4)} style={styles.button}>
                        <Icon type="MaterialCommunityIcons" name="ambulance" style={{ color: 'white', textAlign: 'center' }} />
                        <Text style={styles.buttonText}>Ambulance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 4)} style={styles.button}>
                        <Icon type="FontAwesome" name="bed" style={{ color: 'white', textAlign: 'center' }} />
                        <Text style={styles.buttonText}>Bed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 4)} style={styles.button}>
                        <Icon type="Entypo" name="battery" style={{ color: 'white', textAlign: 'center' }} />
                        <Text style={styles.buttonText}>Electrical</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 4)} style={styles.button}>
                    <Icon ios="ios-medical" android="md-medical" style={{ color: 'white', textAlign: 'center' }} />
                        <Text style={styles.buttonText}>Medical Equipments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMain.bind(this, 4)} style={styles.button}>
                        <Icon ios="ios-water" android="md-water" style={{ color: 'white', textAlign: 'center' }} />
                        <Text style={styles.buttonText}>Water</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        else if (this.state.loginState == 4) {

            var main = (
                <App />
            );
        }



        return (

            <View style={{ flex: 1, flexDirection: 'column' }}>
                <StatusBar
                    backgroundColor="#17AFA0"
                    animated={true}
                    barStyle='light-content'
                />
                <ImageBackground source={require('./../images/background.jpg')} style={{ width: '100%', height: '100%' }}>
                    
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            {main}
                        </View>
                    
                </ImageBackground>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    container2: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        marginLeft: 80,
        marginRight: 80,
        marginTop: 200,
        marginBottom: 200
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    containerKeyboard: {
        flex: 1
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225, 225, 225, 0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#f39c12',
        paddingVertical: 15
    },
    button: {
        marginTop: 20,
        marginLeft: '15%',
        marginRight: '15%',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
    },

    buttonContainer2: {
        backgroundColor: '#c0392b',
        paddingVertical: 15,
        marginBottom: 10,
        marginTop: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 13,
        color: '#FFFFFF',
        fontWeight: '700'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});