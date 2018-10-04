import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView,TextInput,Dimensions} from 'react-native';
import BarcodeScanner, {
    Exception,
    FocusMode,
    TorchMode,
    CameraFillMode,
    BarcodeType,
    pauseScanner,
    resumeScanner
} from 'react-native-barcode-scanner-google';
import NfcManager from 'react-native-nfc-manager';

const styles = StyleSheet.create({
  formContainer:{
    backgroundColor:'#48dbfb',
  },
  subFormContainer:{
    flexDirection:'column',
    flex:0.9
  },
  subPartText:{
    fontSize:17,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
    paddingBottom:15
  },
  deviceText:{
    fontSize:13,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
    paddingTop:15,
    paddingBottom:15
  },
  scrollContainer:{
  },
  scrollContainerContent:{
    flexDirection:'row',
    justifyContent:'center'
  },
})


export default class Part3Main extends Component {
  constructor(props){
    super(props);
    this.state={
      scanning:0
    }
  }

  inputHandler(electricalNumber){
    let newApparatus = this.props.apparatus;
    newApparatus[0].value=electricalNumber;
    this.props.setNewState({
      apparatus:newApparatus
    });
  }

  componentDidMount(){
    NfcManager.isSupported()
      .then(supportedNFC => {
        this.setState({ supportedNFC });
        if (supportedNFC) {
          this._startNfc();
        }
    })
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



  _onTagDiscovered = tag => {
    this.barcodeHandler(tag.id)
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

  barcodeHandler(data){
    console.log(data);
    this.setState({
      scanning:1
    })
    let founded=false;
    if(this.props.apparatus[0].qrcode==data){
      let newApparatus=this.props.apparatus;
      newApparatus[0].founded=true;
      this.setState({
        scanning:2,
      })
      this.props.setNewState({
        apparatus:newApparatus
      })
      NfcManager.unregisterTagEvent()
        .then(result => {
          console.log('unregisterTagEvent OK', result)
        })
        .catch(error => {
          console.warn('unregisterTagEvent fail', error)
        })
      window.alert('Founded!');
    }else{
      window.alert('Wrong qrcode!');
      this.setState({
        scanning:0,
      })
    }
  }

  render(){
    let electricalSafety=null
    if(this.state.scanning==1){
      var scanner=(
        <View style={{flex:1}}>
          <Text style={styles.deviceText}>Loading...</Text>
        </View>
      )
    }else if(this.state.scanning==0 && this.props.currentPage==2 && !this.props.apparatus[0].founded){
      var scanner=(
        <BarcodeScanner
            style={{ flex: 1, height:'100%' }}
            onBarcodeRead={({ data, type }) => {
                // handle your scanned barcodes here!
                // as an example, we show an alert:
                this.barcodeHandler(data);
            }}
            onException={exceptionKey => {
                // check instructions on Github for a more detailed overview of these exceptions.
                switch (exceptionKey) {
                    case Exception.NO_PLAY_SERVICES:
                    // tell the user they need to update Google Play Services
                    case Exception.LOW_STORAGE:
                    // tell the user their device doesn't have enough storage to fit the barcode scanning magic
                    case Exception.NOT_OPERATIONAL:
                    // Google's barcode magic is being downloaded, but is not yet operational.
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
      )
    }else{
      var scanner=(
        <View style={{flex:1}}>
        </View>
      )
    }
    if(this.props.apparatus[0].founded!=undefined){
      let result=null
      if(this.props.apparatus[0].value>this.props.apparatus[0].threshold){
        result=(
          <Text style={{color:'red',fontSize:15, textAlign:'center'}}>Fail</Text>
        )
      }else{
        result=(
          <Text style={{color:'green',fontSize:15, textAlign:'center'}}>Pass</Text>
        )
      }
      electricalSafety=(
        <View style={{flexDirection:'column'}}>
          <View>
            <Text style={{color:'white',textAlign:'center',padding:10}}>Electrical Safety Test{'\n'}</Text>
            <Text style={{color:'white',textAlign:'center',padding:3}}>In accordance to MS IEC 60601 / 61010 / 62353</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
            <View style={{flexDirection:'column',justifyContent:'center'}}>
              <Text style={{color:'white',fontSize:15}}>Result: </Text>
            </View>
            <View>
              <TextInput underlineColorAndroid='transparent' keyboardType='numeric' style={{color:'white',fontSize:15, borderBottomWidth:1, borderBottomColor:'white', width:100}} onChangeText={(data) =>this.inputHandler(data)} />
            </View>
            <View style={{flexDirection:'column',justifyContent:'center'}}>
              <Text style={{color:'white',fontSize:15}}>µA (Limit 10 µA)</Text>
            </View>
          </View>
          <View style={{marginTop:15}}>
            {result}
          </View>
        </View>
      )
    }
    const {height, width} = Dimensions.get('window');
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 3 - Electrical Safety Test</Text>
          <View style={{height:height/2}}>
            {scanner}
          </View>
          <Text style={styles.deviceText}>Scan the Electrical Safety Analyzer</Text>
          {electricalSafety}
        </View>
      </ScrollView>
    )
  }
}
