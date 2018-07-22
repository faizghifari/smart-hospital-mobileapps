import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, KeyboardAvoidingView } from 'react-native';


import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';
import { RNCamera } from 'react-native-camera';

import App from './../../../App'



import {Toast,Root,Form, Item, Input, Label} from 'native-base';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
          loginState: 0,
          error: false,
          email: this.props.username,
          password: '',
          
        };
      }

      updateUser(email)
      {
          this.props.updateUsername(email);
      }

      selectPage(i){
        this.props.selectPage(i);
      }

      selectMain(i){
        this.setState({
          loginState: i
        })
      }
      
      submitEmail(){
        if(this.state.email!='' && this.state.password!=''){
          this.setState({
            error:false
          })
        }
        else{
            this.setState({
              error:true
            })
          }
        if(this.state.password=='1234'){
            this.updateUser(this.state.email);
            
            this.props.user
            const {
                email,                  // Get the credentials entered by the user
                password,               // (We're assuming you are using controlled form inputs here)
                shouldEnableTouchID,    // Did you ask the user if they want to enable Touch ID login ?
              } = this.state;

                if (shouldEnableTouchID) {
                // if login is successful and users want to enable Touch ID login
                Keychain.setGenericPassword(email, password) // store the credentials in the keychain
                .then(() => {
                    console.log('Credentials saved successfully!');
                  });
               }
            this.props.selectPage(1);
            
        }
      }

    //Touch ID
      submitTouchID(){
        
        Keychain.getGenericPassword()  // Retrieve the credentials from the keychain
            .then(credentials => {
            const { email, password } = credentials; 
            
            
            // Prompt the user to authenticate with Touch ID.
            // You can display the username in the prompt
            TouchID.authenticate(`to login with username "${this.state.email}"`)   
                .then(() => {
                // If Touch ID authentication is successful, call the `login` api
                        this.props.selectPage(1)
                    // Handle login success
                    .catch(error => {
                    if (error === 'INVALID_CREDENTIALS') {
                        // The keychain contained invalid credentials :(
                        // We need to clear the keychain and the user will have to sign in manually
                        Keychain.resetGenericPassword();
                    }
                    })
                }); 
            }); 

      }


    render() {
        if(this.state.loginState==0){ 
            var main=(
                <View>
                <Text style={{fontSize:16,color:'white', textAlign:'center'}}>Please choose method for login</Text>
                <TouchableOpacity onPress={this.selectMain.bind(this,1)} style={styles.button}>
                    <Text style={styles.buttonText}>Email/Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.selectMain.bind(this,3)} style={styles.button}>
                    <Text style={styles.buttonText}>QR Code/Barcode</Text>
                </TouchableOpacity>
                <Text style={{fontSize:13, textAlign:'center',color:'white', textDecorationLine:'underline', marginTop:5}}
                onPress={() =>
                Toast.show({
                    text: "Please contact your administrator",
                    buttonText: "Okay",
                    position: "bottom"
                })}
                >Not have any of these?</Text>
                </View>
              );
        }

        else if(this.state.loginState==1){
            if(this.state.error){
                var error=(
                    <Text style={{fontSize:13, color:'red', marginBottom:5,}}>Please fill both email and password field</Text>
                )   
              }else{
                var error=null;
              }
              var main=(
                <View style={styles.container}>
                <StatusBar barStyle="light-content" />
        
                {error}
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="rgba(225, 225, 225, 0.7)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    onChangeText={(email)=>this.setState({email})}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="rgba(225, 225, 225, 0.7)"
                    returnKeyType="go"
                    onChangeText={(password)=>this.setState({password})}
                    secureTextEntry={true}
                    style={styles.input}
                    ref={(input) => this.passwordInput = input} // ini apa
                    />    
                

                
                <TouchableOpacity onPress={this.submitEmail.bind(this)} style={styles.button}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={this.selectMain.bind(this,0)}>
                    <Text style={{fontSize:13, color:'white', marginTop:5,}} >Back</Text>  
                </TouchableOpacity> 

                <TouchableOpacity onPress={this.submitTouchID.bind(this)}>
                    <Text  style={{fontSize:13, color:'white', marginTop:5,}} >Using TouchID ?</Text>  
                </TouchableOpacity> 
            </View>
              );
        }

        
        else if(this.state.loginState==2){ 
                var main=(
                    <View style={styles.container}>
                    <StatusBar barStyle="light-content" />
                         <Text style={styles.buttonText}>TOUCH ID Success</Text>  
                         <TouchableOpacity onPress={this.selectMain.bind(this,0)}>
                            <Text style={{fontSize:13, color:'white', marginTop:5,}} >Back</Text>  
                        </TouchableOpacity> 
                    </View>
                  );
            
        }

        else if(this.state.loginState==3){
            return (
                <View style={styles.container2}>
                  <RNCamera
                      ref={ref => {
                        this.camera = ref;
                      }}
                      style = {styles.preview}
                      type={RNCamera.Constants.Type.back}
                      flashMode={RNCamera.Constants.FlashMode.on}
                      permissionDialogTitle={'Permission to use camera'}
                      permissionDialogMessage={'We need your permission to use your camera phone'}
                      barCodeTypes={[RNCamera.Constants.BarCodeType.qr, RNCamera.Constants.BarCodeType.code128]}
                      onBarCodeRead={ //(e)=>{
                          this.selectPage.bind(this,1)
                          //this.render({this.selectMain.bind(this,1)})
                          //window.alert(e.data)
                        }
                  />
                  <View style={{backgroundColor:'white', justifyContent: 'center',}}>
                    <TouchableOpacity
                        onPress={this.selectMain.bind(this,0)}
                        style = {styles.capture}
                    >
                        <Text style={{fontSize: 14}}> BACK </Text>
                    </TouchableOpacity>
                    </View>
                </View>
              );
        }
      
    
        
        return (
            
        <Root>
            <View style={{flex:1, flexDirection: 'column'}}>
                <StatusBar
                    backgroundColor="#17AFA0"
                    animated={true}
                    barStyle='light-content'
                />
            <ImageBackground source={require('./../../images/background.jpg')} style={{width: '100%', height: '100%'}}>
                <KeyboardAvoidingView behavior="padding" style={styles.containerKeyboard}>
                    <View style={{flex:0.25, justifyContent:'flex-end'}}>
                        <Text style={{fontWeight:'bold',fontSize:30,color:'white', textAlign:'center'}}>SMART HOSPITAL</Text>
                    </View>
                    <View style={{flex:0.6, justifyContent:'center'}}>
                        {main}
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
            </View>
      </Root>
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
        marginLeft:80,
        marginRight:80,
        marginTop:200,
        marginBottom:200
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
        backgroundColor : 'rgba(225, 225, 225, 0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#f39c12',
        paddingVertical: 15
    }, 
    button:{
        marginTop:20,
        marginLeft:'15%',
        marginRight:'15%',
        padding:10,
        backgroundColor:'rgba(0, 0, 0, 0)',
        borderColor:'white',
        borderRadius:10,
        borderWidth:1,
      },

    buttonContainer2: {
        backgroundColor: '#c0392b',
        paddingVertical: 15,
        marginBottom: 10,
        marginTop: 10,
    }, 
    buttonText: {
        textAlign: 'center',
        fontSize:13,
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