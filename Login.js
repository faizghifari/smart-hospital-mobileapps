import React, {Component} from 'react';
import {ImageBackground, Text, StatusBar, View, StyleSheet, TouchableOpacity,Platform} from 'react-native';
import {Toast,Root,Form, Item, Input, Label} from 'native-base';
import BarcodeScanner, {
    Exception,
    FocusMode,
    TorchMode,
    CameraFillMode,
    BarcodeType,
    pauseScanner,
    resumeScanner
} from 'react-native-barcode-scanner-google';
import RNCamera from 'react-native-camera';
import NfcManager from 'react-native-nfc-manager';


import App from './App';

const styles=StyleSheet.create({
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
  buttonEmail:{
    marginTop:20,
    padding:10,
    backgroundColor:'rgba(0, 0, 0, 0)',
    borderColor:'white',
    borderRadius:10,
    borderWidth:1,
  },
  buttonText:{
    fontSize:13,
    color:'white',
    textAlign:'center'
  },
  form:{
    marginLeft:0,
  }
});

export default class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      showToast: false,
      loginState: 0,
      dataBarcode: '-',
      typeBarcode: '-',
      supportedNFC: true,
      enabledNFC: false,
      parsedText: null,
      tag: {},
      qrExcept:0,
      email:'',
      password:'',
      error:false,
    };
  }


  submitEmail(){
    if(this.state.email!='' && this.state.password!=''){
      this.setState({
        error:false
      })
      this.props.login();
    }else{
      this.setState({
        error:true
      })
    }
  }

  _startNfc() {
    NfcManager.start({
      onSessionClosedIOS: () => {
        console.log('ios session closed');
      }
    })
    .then(result => {
      console.log('start OK', result);
    })
    .catch(error => {
      console.warn('start fail', error);
      this.setState({supportedNFC: false});
    })

    if (Platform.OS === 'android') {
      NfcManager.getLaunchTagEvent()
        .then(tag => {
          console.log('launch tag', tag);
          if (tag) {
            this.setState({ tag });
          }
        })
        .catch(err => {
          console.log(err);
          })
      NfcManager.isEnabled()
        .then(enabledNFC => {
          this.setState({ enabledNFC });
        })
        .catch(err => {
          console.log(err);
        })
        NfcManager.onStateChanged(
          event => {
            if (event.state === 'on') {
              this.setState({enabledNFC: true});
            } else if (event.state === 'off') {
              this.setState({enabledNFC: false});
            } else if (event.state === 'turning_on') {
                // do whatever you want
            } else if (event.state === 'turning_off') {
                // do whatever you want
            }
          }
        )
        .then(sub => {
          this._stateChangedSubscription = sub;
                // remember to call this._stateChangedSubscription.remove()
                // when you don't want to listen to this anymore
        })
        .catch(err => {
            console.warn(err);
        })
    }
    NfcManager.registerTagEvent(this._onTagDiscovered)
      .then(result => {
          console.log('registerTagEvent OK', result)
      })
      .catch(error => {
          console.warn('registerTagEvent fail', error)
      })
  }

  _parseText = (tag) => {
    if (tag.ndefMessage) {
      return NdefParser.parseText(tag.ndefMessage[0]);
    }
    return null;
  }

  _onTagDiscovered = tag => {
    console.log('Tag Discovered', tag);
    this.setState({ tag });
    let text = this._parseText(tag);
    this.setState({parsedText: text});
  }

  _startDetection = () => {
    NfcManager.registerTagEvent(this._onTagDiscovered)
      .then(result => {
          console.log('registerTagEvent OK', result)
      })
      .catch(error => {
          console.warn('registerTagEvent fail', error)
      })
  }


  selectMain(i){
    this.setState({
      loginState: i
    })
    if(i==3){
      NfcManager.isSupported()
        .then(supportedNFC => {
          this.setState({ supportedNFC });
          if (supportedNFC) {
            this._startNfc();
          }
      })
    }
  }

  chooseMethod(){
    if(this.state.loginState==3){
      NfcManager.unregisterTagEvent()
        .then(result => {
          console.log('unregisterTagEvent OK', result)
        })
        .catch(error => {
          console.warn('unregisterTagEvent fail', error)
        })
      if (this._stateChangedSubscription) {
        this._stateChangedSubscription.remove();
      }
    }
    this.setState({
      loginState: 0
    })
  }

  _goToNfcSetting = () => {
    if (Platform.OS === 'android') {
      NfcManager.goToNfcSetting()
        .then(result => {
            console.log('goToNfcSetting OK', result)
        })
        .catch(error => {
            console.warn('goToNfcSetting fail', error)
        })
    }
  }

  render(){
    console.log(RNCamera);
    if(this.state.loginState==0){
      var main=(
        <View>
          <Text style={{fontSize:16,color:'white', textAlign:'center'}}>Please choose method for login</Text>
          <TouchableOpacity onPress={this.selectMain.bind(this,1)} style={styles.button}>
            <Text style={styles.buttonText}>Email/Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectMain.bind(this,2)} style={styles.button}>
            <Text style={styles.buttonText}>QR Code/Barcode</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectMain.bind(this,3)} style={styles.button}>
            <Text style={styles.buttonText}>NFC/RFID</Text>
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
    }else if (this.state.loginState==1) {
      if(this.state.error){
        var error=(
          <Text style={{fontSize:13, color:'red', marginTop:5}}>Please fill both email and password field</Text>
        )
      }else{
        var error=null;
      }
      var main=(
        <View style={{marginLeft:'5%',marginRight:'5%'}}>
          <Form>
           <Item style={styles.form} floatingLabel>
             <Label style={{color:'white'}}>Email</Label>
             <Input style={{color:'white'}} onChangeText={(email)=>this.setState({email})} />
           </Item>
           <Item style={styles.form} floatingLabel>
             <Label style={{color:'white'}}>Password</Label>
             <Input style={{color:'white'}} onChangeText={(password)=>this.setState({password})} secureTextEntry={true}/>
           </Item>
           {error}
           <Text style={{fontSize:13, color:'white', textDecorationLine:'underline', marginTop:5}}
           onPress={() =>
           Toast.show({
             text: "Please contact your administrator",
             buttonText: "Okay",
             position: "bottom"
           })}
           >Forgotten Account?</Text>
           <View style={{flexDirection:'row', justifyContent:'space-between'}}>
             <View style={{flex:0.45}}>
               <TouchableOpacity style={styles.buttonEmail} onPress={this.submitEmail.bind(this)}>
                 <Text style={styles.buttonText}>Login</Text>
               </TouchableOpacity>
              </View>
              <View style={{flex:0.45}}>
                <TouchableOpacity style={styles.buttonEmail} onPress={this.chooseMethod.bind(this)}>
                  <Text style={styles.buttonText}>Try other method</Text>
                </TouchableOpacity>
               </View>
            </View>
          </Form>
        </View>
      )
    }else if (this.state.loginState==2) {
      if(Platform.OS==='android'){
        var scanner = (
          <BarcodeScanner
              style={{ flex: 1 }}
              onBarcodeRead={({ data, type }) => {
                  // handle your scanned barcodes here!
                  // as an example, we show an alert:
                  this.setState({
                    dataBarcode: data,
                    typeBarcode: type
                  })

              }}
              onException={exceptionKey => {
                  // check instructions on Github for a more detailed overview of these exceptions.
                  switch (exceptionKey) {
                      case Exception.NO_PLAY_SERVICES:
                        this.setState({
                          qrExcept:1
                        })
                      case Exception.LOW_STORAGE:
                        this.setState({
                          qrExcept:2
                        })
                      case Exception.NOT_OPERATIONAL:
                        this.setState({
                          qrExcept:3
                        })
                      default:
                          break;
                  }
              }}
              focusMode={FocusMode.AUTO /* could also be TAP or FIXED */}
              torchMode={TorchMode.ON /* could be the default OFF */}
              cameraFillMode={
                  CameraFillMode.FIT /* could also be FIT */
              }
              barcodeTypes={
                  BarcodeType.QR_CODE |
                  BarcodeType.CODE_128
              }
          />
        );
      }else{
        var scanner=(
          <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style = {styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={'We need your permission to use your camera phone'}
              onBarcodeRead={(e)=>{
                this.setState({
                  dataBarcode: e.data,
                  typeBarcode: e.type
                })
              }}
              barCodeTypes={[RNCamera.Constants.BarCodeType.qr,RNCamera.Constants.BarCodeType.code128]}
          />
        );
      }
      if(this.state.qrExcept==1){
        scanner=(
          <Text style={{fontSize:20, textAlign:'center',color:'white', marginTop:5, marginBottom: 20}}>
          Error occured, please update Google Play Services and try again later</Text>
        )
      }else if (this.state.qrExcept==2) {
        scanner=(
          <Text style={{fontSize:20, textAlign:'center',color:'white', marginTop:5, marginBottom: 20}}>
          Low Storage, please free some space and try again later</Text>
        )
      }else if (this.state.qrExcept==3) {
        scanner=(
          <Text style={{fontSize:20, textAlign:'center',color:'white', marginTop:5, marginBottom: 20}}>
          Error occured, please wait for a bit and check your internet connection</Text>
        )
      }
      var main=(
        <View style={{flex:1}}>
          <Text style={{fontSize:13, textAlign:'center',color:'white', marginTop:5, marginBottom: 30}}
          >Data: {this.state.dataBarcode}, Type: {this.state.typeBarcode}</Text>
          {scanner}
          <TouchableOpacity style={styles.button} onPress={this.chooseMethod.bind(this)}>
            <Text style={styles.buttonText}>Try other method</Text>
          </TouchableOpacity>
        </View>
      )
    }else if (this.state.loginState==3) {
      if(!this.state.supportedNFC){
        var action=(
          <Text style={{fontSize:20, textAlign:'center',color:'white', marginTop:5, marginBottom: 20}}>
          NFC not supported on your phone</Text>
        )
      }else if (!this.state.enabledNFC) {
        var action=(
          <View>
            <Text style={{fontSize:20, textAlign:'center',color:'white', marginTop:5, marginBottom: 20}}>
            NFC disabled, please enable the NFC</Text>
            <TouchableOpacity style={styles.button} onPress={this._goToNfcSetting.bind(this)}>
              <Text style={styles.buttonText}>Open NFC setting</Text>
            </TouchableOpacity>
          </View>
        )
      }else{
        var action=(
          <View>
            <Text style={{fontSize:20, textAlign:'center',color:'white', marginTop:5, marginBottom: 20}}>
            Please place the RFID/NFC tag near the reader (usually behind the phone)</Text>
            <Text style={{fontSize:10, textAlign:'center',color:'white', marginTop:5, marginBottom: 20}}>
            {`Current tag JSON: ${JSON.stringify(this.state.tag)}`}</Text>
          </View>
        )
      }

      var main=(
        <View style={{flex:1}}>
          {action}
          <TouchableOpacity style={styles.button} onPress={this.chooseMethod.bind(this)}>
            <Text style={styles.buttonText}>Try other method</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return(
      <Root>
        <View style={{flex:1, flexDirection: 'column'}}>
          <StatusBar
            backgroundColor="#17AFA0"
            animated={true}
            barStyle='light-content'
          />
          <ImageBackground source={require('./assets/background.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={{flex:0.25, justifyContent:'flex-end'}}>
              <Text style={{fontWeight:'bold',fontSize:30,color:'white', textAlign:'center'}}>SMART HOSPITAL</Text>
            </View>
            <View style={{flex:0.6, justifyContent:'center'}}>
              {main}
            </View>
          </ImageBackground>
        </View>
      </Root>
    );
  }
}
