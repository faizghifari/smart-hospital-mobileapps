import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,ScrollView,StatusBar,TextInput,Platform,Dimensions} from 'react-native';
import {CheckBox, ListItem, Body, Text as TextN} from 'native-base';
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
  scrollContainer:{
  },
  scrollContainerContent:{
    flexDirection:'row',
    justifyContent:'center'
  },
  deviceText:{
    fontSize:13,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
    paddingTop:15,
    paddingBottom:15
  }
})


export default class Part2PrePM extends Component {
  constructor(props){
    super(props);
    this.state={
      scanning:0,
      supportedNFC:null,
      enabledNFC:null
    }
  }
  sparePartHandler(data,index){
    let check=false;
    let desc=null;
    if(data.id!=undefined){
      check=true;
      desc=data.name+', id='+data.id
    }else{
      desc=data.name
    }
    return(
      <ListItem style={{borderBottomWidth:0}}>
        <CheckBox checked={check} />
        <Body>
          <TextN style={{color:'white'}}>{desc}</TextN>
        </Body>
      </ListItem>
    )
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

  barcodeHandler(data){
    console.log(data);
    this.setState({
      scanning:1
    })
    let founded=false;
    for(i=0;i<this.props.sparePart.length;i++){
      console.log(this.props.sparePart[i].name);
      if(data==this.props.sparePart[i].typeId && (this.props.sparePart[i].id==undefined)){
        let newSparePart = this.props.sparePart;
        newSparePart[i].id = 1;
        this.props.setNewState({
          sparePart:newSparePart
        })
        founded=true;
        window.alert('Founded! '+this.props.sparePart[i].name+', id=1');
      }
    }
    if(!founded){
      window.alert('Wrong qrcode or tag!');
    }
    let pass=true
    for (i=0;i<this.props.sparePart.length;i++){
      if(this.props.sparePart[i].id==undefined){
        console.log(i);
        pass=false
      }
    }
    if(pass){
      NfcManager.unregisterTagEvent()
        .then(result => {
          console.log('unregisterTagEvent OK', result)
        })
        .catch(error => {
          console.warn('unregisterTagEvent fail', error)
        })
      this.setState({
        scanning:2,
      })
    }else{
      this.setState({
        scanning:0,
      })
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


  render(){
    let pass=true
    for (i=0;i<this.props.sparePart.length;i++){
      if(this.props.sparePart[i].id==undefined){
        pass=false
      }
    }
    if(this.state.scanning==1){
      var scanner=(
        <View style={{flex:1}}>
          <Text style={styles.deviceText}>Loading...</Text>
        </View>
      )
    }else if(this.state.scanning==0 && !pass){
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
    const {height, width} = Dimensions.get('window');
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 2 - Spare Part</Text>
          <View style={{height:height/2}}>
            {scanner}
          </View>
          <Text style={styles.deviceText}>Scan the spare part barcode or use the NFC if available</Text>
          <FlatList
            style={{flex:1}}
            data={this.props.sparePart}
            renderItem={({item,index})=>this.sparePartHandler(item,index)} //change this
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
      </ScrollView>
    )
  }
}
