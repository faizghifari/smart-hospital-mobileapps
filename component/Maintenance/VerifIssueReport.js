import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,ScrollView,StatusBar,TextInput,Dimensions,Image} from 'react-native';
import {CheckBox, ListItem, Body, Text as TextN,Button} from 'native-base';
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
import {MIcon as Icon}  from './../Utilities/Icon.js';


const styles = StyleSheet.create({
  formContainer:{
    backgroundColor:'#48dbfb',
  },
  subFormContainer:{
    flexDirection:'column',
    flex:0.9,
    paddingTop:20
  },
  subPartText:{
    fontSize:17,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
    paddingBottom:15
  },
  scrollContainer:{
    backgroundColor:'#CCC8FF'
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
  },
  assetDetails:{
    fontSize:15,
    color:'white'
  },
  subAssetDetails:{
    fontSize:13,
    paddingLeft:20,
    color:'white'
  },
  notes:{
    color: 'white',
    fontSize: 12,
  },
  button:{
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
  photoBox: {
    width:60,
    height:80,
    borderColor:'white',
    borderWidth:1,
    marginLeft:5
  },
})


export default class VerifIssueReport extends Component {
  constructor(props){
    super(props);
    this.state={
      scanning:0,
      ticked:false,
      desc:null,
      photoTaken:['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']
    }
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
    if(data=='1111'){
      this.setState({
        scanning:2,
        savedId:data,
        notes:"Can't turn on the asset, i think the power cable broke"
      })
      window.alert('Founded!');
    }else{
      this.setState({
        scanning:0,
      })
      window.alert('Wrong QR Code')
    }

  }

  submit(){
    console.log('asdasd')
  }

  finish(){
    this.setState({
      ticked:!this.state.ticked
    })
  }

  renderPhoto(item,index){
    console.log(item)
    return(
      <TouchableOpacity style={styles.photoBox} onPress={()=>console.log('this')}>
        <Image style={{width: 60, height: 80}} source={{uri: "https://webstyle.unicomm.fsu.edu/img/placeholders/ratio-3-4.png"}}/>
      </TouchableOpacity>
    )
  }

  render(){
    let scanner=null
    let form=null
    let image=null
    if(this.state.scanning==1){
      scanner=(
        <View style={{flex:1}}>
          <Text style={styles.deviceText}>Loading...</Text>
        </View>
      )
    }else if(this.state.scanning==0){
      scanner=(
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
      scanner=(
        <View style={{flex:1}}>
        </View>
      )
    }
    if(this.state.scanning==2){
      image=(
        <Image style={{width: 150, height: 200,borderColor:'white',borderWidth:1,margin:10}} source={{uri: "https://webstyle.unicomm.fsu.edu/img/placeholders/ratio-3-4.png"}}/>
      )
      scanner=(
        <View style={{flexDirection:'column',flex:1,alignItems:'center'}}>
          {image}
          <FlatList
            style={{flex:1,borderColor:'white'}}
            data={this.state.photoTaken}
            renderItem={({item,index})=>this.renderPhoto(item,index)} //change this
            keyExtractor={(item,key) => key.toString()}
            horizontal={true}
          />
        </View>
      )
      form=(
        <View style={{flexDirection:'column',marginBottom:20}}>
          <Text style={styles.assetDetails}>• ID Number{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.state.savedId}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Name{'\n'}</Text>
          <Text style={styles.subAssetDetails}>Puritan Bennet{'\n'}</Text>
          <Text style={styles.assetDetails}>• Description</Text>
          <Text style={styles.notes}>{this.state.notes}</Text>
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <View style={{flex:0.40}}>
              <TouchableOpacity style={styles.button} onPress={this.props.changeMenu.bind(this,3,this.state)}>
                <Text style={styles.buttonText}>Process to CM</Text>
              </TouchableOpacity>
             </View>
             <View style={{flex:0.40}}>
               <TouchableOpacity style={styles.button} onPress={this.props.backHandler.bind(this)}>
                 <Text style={styles.buttonText}>Dismiss</Text>
               </TouchableOpacity>
              </View>
           </View>
        </View>
      )
    }
    const {height, width} = Dimensions.get('window');
    return(
      <View style={{flex:1}}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
          <StatusBar
            backgroundColor="#a29bfe"
            animated={true}
            barStyle='light-content'
          />
          <View style={styles.subFormContainer}>
            <Text style={styles.subPartText}>Verify the report</Text>
            <View style={{height:height/2}}>
              {scanner}
            </View>
            <Text style={styles.deviceText}>Scan the asset</Text>
            {form}
          </View>
        </ScrollView>
      </View>
    )
  }
}
