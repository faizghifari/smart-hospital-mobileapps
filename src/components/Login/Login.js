import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';

import {Toast,Root,Form, Item, Input, Label} from 'native-base';

export default class Login extends Component {
    render() {
        return (
            <Root>
                <View style={{flex:1, flexDirection: 'column'}}>
                    <ImageBackground source={require('./../../images/background.jpg')} style={{width: '100%', height: '100%'}}>
                        <KeyboardAvoidingView behavior="padding" style={styles.container}>
                        <View style={styles.logoContainer}>
                            <Text style={styles.title}>SMART HOSPITAL</Text>
                            <Image 
                                style={styles.logo}
                                source={require('../../images/medical.png')}
                            />
                        </View>

                        <View style={styles.formContainer}> 
                            <LoginForm/>
                        </View> 
                        </KeyboardAvoidingView >
                    </ImageBackground>
                </View>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight:'bold',
        fontSize:25
    }
}); 