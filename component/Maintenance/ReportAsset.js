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
import ImagePicker from 'react-native-image-crop-picker';
import {MIcon as Icon}  from './../Utilities/Icon.js';
import RadioForm from 'react-native-simple-radio-button';

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
    flex:1,
    backgroundColor:'#CCC8FF',
    paddingBottom:30
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
  photoBox: {
    width:60,
    height:80,
    borderColor:'white',
    borderWidth:1,
    marginLeft:5
  },
  button: {
    marginRight: '15%',
    padding: 10,
    margin: 4,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
  },
})


export default class ReportAsset extends Component {
  constructor(props){
    super(props);
    this.state={
      scanning:0,
      ticked:false,
      desc:null,
      photoTaken:[null],
      selectedImage:null,
      name:null,
      adverse:false,
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
    this.setState({
      scanning:2,
      savedId:data
    })
    window.alert('Founded!');
  }

  submit(){
    console.log('asdasd')
  }

  finish(){
    this.setState({
      ticked:!this.state.ticked
    })
  }

  takePhoto(){
    ImagePicker.openCamera({
      width: 600,
      height: 800,
      includeBase64: true,
    }).then(image => {
      let photoTaken=this.state.photoTaken
      let selectedImage=this.state.photoTaken.length
      console.log(image.data)
      photoTaken.push(image.data)
      this.setState({
        photoTaken:photoTaken,
        selectedImage:selectedImage
      })
    });
  }

  selectPhoto(index){
    this.setState({
      selectedImage:index
    })
  }

  renderPhoto(item,index){
    if(index==0){
      return (
        <TouchableOpacity style={[styles.photoBox,{flexDirection:'column',justifyContent:'center',alignItems:'center'}]} onPress={this.takePhoto.bind(this)}>
          <Text style={{color:'white',fontSize:13,textAlign:'center'}}>Add photo</Text>
          <Icon style={{fontSize:20,color:'white'}} family="FontAwesome" name="camera" />
        </TouchableOpacity>
      )
    }else{
      let base64Image = 'data:image/png;base64,'+item;
      return(
        <TouchableOpacity style={styles.photoBox} onPress={this.selectPhoto.bind(this,index)}>
          <Image style={{width: 60, height: 80}} source={{uri: base64Image}}/>
        </TouchableOpacity>
      )
    }
  }

  submitReport(){
    window.alert('Submitted!')
    this.props.backHandler()
  }

  render(){
    let form=null
    let button=null
    let camera=null
    let text=null
    let field=null
    let radio_props = [
      { label: 'Breakdown', value: false },
      { label: 'Adverse', value: true },
    ];
    if(this.state.adverse){
      field=(
        <View style={{marginBottom:20}}>
          <Text style={styles.assetDetails}>Please identify the victim name</Text>
          <TextInput style={{color:'white',fontSize:14, borderBottomWidth:1, borderBottomColor:'white', paddingBottom:5}} underlineColorAndroid='transparent' multiline={true} editable={true} maxLength={200} onChangeText={(name) => this.setState({name})}  />
          <Text style={styles.assetDetails}>Please describe the victim condition you found</Text>
          <TextInput style={{color:'white',fontSize:14, borderBottomWidth:1, borderBottomColor:'white', paddingBottom:5}} underlineColorAndroid='transparent' multiline={true} editable={true} maxLength={200} onChangeText={(desc) => this.setState({desc})}  />
        </View>
      )
    }else{
      field=(
        <View>
          <Text style={styles.assetDetails}>Please describe the broken part of the asset you found</Text>
          <TextInput style={{color:'white',fontSize:14, borderBottomWidth:1, borderBottomColor:'white', paddingBottom:5}} underlineColorAndroid='transparent' multiline={true} editable={true} maxLength={200} onChangeText={(desc) => this.setState({desc})}  />
        </View>
      )
    }
    if(this.state.scanning!=2){
      text="Scan the asset you want to report"
    }
    console.log(this.props.currentPage);
    if(this.state.scanning==1){
      camera=(
        <View style={{flex:1}}>
          <Text style={styles.deviceText}>Loading...</Text>
        </View>
      )
    }else if(this.state.scanning==0){
      camera=(
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
      let image=null
      if(this.state.selectedImage!=null){
        let base64Image = 'data:image/png;base64,'+this.state.photoTaken[this.state.selectedImage];
        image=(
          <Image style={{width: 150, height: 200,borderColor:'white',borderWidth:1,margin:10}} source={{uri: base64Image}}/>
        )
      }
      camera=(
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
      text="Take the photo refer to what you want to report"
    }
    if(this.state.ticked){
      button=(
        <TouchableOpacity style={{borderWidth:2,borderColor:'white',borderRadius:10,backgroundColor:'rgba(0,0,0,0)',padding:10,marginBottom:10}} onPress={this.submitReport.bind(this)}>
          <Text style={{color:'white',textAlign:'center'}}>Submit</Text>
        </TouchableOpacity>
      )
    }
    if(this.state.scanning==2){
      form=(
        <View style={{flexDirection:'column'}}>
          <Text style={styles.assetDetails}>• ID Number{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.state.savedId}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Name{'\n'}</Text>
          <Text style={styles.subAssetDetails}>Incubator{'\n'}</Text>
          {field}
          <ListItem style={{borderBottomWidth:0}}>
            <CheckBox checked={this.state.ticked} onPress={this.finish.bind(this)}  />
            <Body>
              <TextN style={{color:'white'}}>I have describe everything refer to what i want to report</TextN>
            </Body>
          </ListItem>
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
            <Text style={styles.subPartText}>Report for Broken Asset/Accident (Breakdown/Adverse Report)</Text>
            <View style={{height:height/2}}>
              {camera}
            </View>
            <RadioForm
              style={{paddingTop:20}}
              radio_props={radio_props}
              initial={0}
              buttonInnerColor={'white'}
              buttonColor={'white'} labelColor={'white'} selectedButtonColor={'white'} selectedLabelColor={'white'}
              onPress={(value) => {
                this.setState({ adverse: value })
              }}
            />
            <Text style={styles.deviceText}>{text}</Text>
            {form}
            {button}
          </View>
        </ScrollView>
      </View>
    )
  }
}
