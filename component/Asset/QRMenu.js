import React, {Component} from 'react';
import {Text, StatusBar, View, StyleSheet, TouchableOpacity,Platform,BackHandler,DeviceEventEmitter} from 'react-native';
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
import Asset from './Asset.js';

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

export default class QRMenu extends Component{

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
      openDetail:false,
    };
    this.backPressSubscriptions = new Set();
  }

  openDetail(){
    this.setState({
      openDetail:true
    })
  }

  _parseText = (tag) => {
    if (tag.ndefMessage) {
      return NdefParser.parseText(tag.ndefMessage[0]);
    }
    return null;
  }

  componentDidMount(){
    DeviceEventEmitter.removeAllListeners('hardwareBackPress')
    DeviceEventEmitter.addListener('hardwareBackPress', () => {
      let invokeDefault = true
      const subscriptions = []

      this.backPressSubscriptions.forEach(sub => subscriptions.push(sub))

      for (let i = 0; i < subscriptions.reverse().length; i += 1) {
        if (subscriptions[i]()) {
          invokeDefault = false
          break
        }
      }

      if (invokeDefault) {
        BackHandler.exitApp()
      }
    })

    this.backPressSubscriptions.add(this.backHandler.bind(this))
  }

  backHandler(){
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    this.backPressSubscriptions.clear();
    this.props.changeMenu(0);
    return true;
  }

  render(){
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
        >Scan QRCode/Barcode of the device{'\n'}Data: {this.state.dataBarcode}, Type: {this.state.typeBarcode}</Text>
        {scanner}
        <TouchableOpacity style={styles.button} onPress={this.backHandler.bind(this)}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    )
    if(this.state.openDetail){
      return(
        <View style={{flex:1}}>
          <Asset selectedAsset={this.state.selectAsset} backHandler={this.openDetail.bind(this)} />
        </View>
      )
    }else{
      return(
        <View style={{flex:1, flexDirection: 'column',backgroundColor:'#FF7364'}}>
          <StatusBar
            backgroundColor="#e74c3c"
            animated={true}
            barStyle='light-content'
          />
          <View style={{flex:0.25, justifyContent:'flex-end'}}>
            <Text style={{fontWeight:'bold',fontSize:30,color:'white', textAlign:'center'}}>QRCode/Barcode scanner</Text>
          </View>
          <View style={{flex:0.6, justifyContent:'center'}}>
            {main}
          </View>
        </View>
      );
    }
  }
}
