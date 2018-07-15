import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends Component {
    render() {
        return (
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#27ae60'
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