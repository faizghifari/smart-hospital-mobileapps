import React, {Component} from 'react';
import {ImageBackground, Text, StatusBar, View, StyleSheet, TouchableOpacity,Platform,KeyboardAvoidingView} from 'react-native';
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

export default class NFCMenu extends Component{

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

  backHandler(){
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
    this.props.changeMenu(0);
  }

  render(){
    NfcManager.isSupported()
      .then(supportedNFC => {
        this.setState({ supportedNFC });
        if (supportedNFC) {
          this._startNfc();
        }
    })
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
          <TouchableOpacity style={styles.button} onPress={this.backHandler.bind(this)}>
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
        <TouchableOpacity style={styles.button} onPress={this.props.changeMenu.bind(this,0)}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    )
    return(
      <View style={{flex:1, flexDirection: 'column',backgroundColor:'#9b59b6'}}>
        <StatusBar
          backgroundColor="#9b59b6"
          animated={true}
          barStyle='light-content'
        />
        <View style={{flex:0.25, justifyContent:'flex-end'}}>
          <Text style={{fontWeight:'bold',fontSize:30,color:'white', textAlign:'center'}}>NFC/RFID scanner</Text>
        </View>
        <View style={{flex:0.6, justifyContent:'center'}}>
          {main}
        </View>
      </View>
    );
  }
}
