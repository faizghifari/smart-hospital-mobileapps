import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,ScrollView,StatusBar,TextInput,Dimensions} from 'react-native';
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

// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

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
  },
  notes:{
    color: 'white',
    fontSize: 12,
  },
  subNotes:{
    fontStyle:'italic',
    fontSize: 12,
    color:'white'
  }
})

let globalCount=0
let flag=0

export default class Part4Main extends Component {
  constructor(props){
    super(props);
    this.state={
      scanning:0
    }
  }
  apparatusHandler(data,index){
    if(index==0){
      return(
        null
      )
    }
    let check=false;
    let desc=null;
    if(data.id!==undefined){
      check=true
      desc=data.name+', id='+data.id
    }else{
      desc=data.name
    }
    if(this.props.apparatus[index].id!==undefined){
      return(
        <View style={{flexDirection:'column'}}>
          <ListItem style={{borderBottomWidth:0}}>
            <CheckBox checked={check} />
            <Body>
              <TextN style={{color:'white'}}>{desc}</TextN>
            </Body>
          </ListItem>
          <FlatList
            style={{flex:1}}
            data={data.task}
            renderItem={({item,index})=>this.taskHandler(item,index)} //change this
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
      )
    }else{
      return(
        <View style={{flexDirection:'column'}}>
          <ListItem style={{borderBottomWidth:0}}>
            <CheckBox checked={check} />
            <Body>
              <TextN style={{color:'white'}}>{desc}</TextN>
            </Body>
          </ListItem>
        </View>
      )
    }
  }

  taskHandler(item,index){
    let set=null
    let form=null
    if(item.units!=null){
      if(item.set!=null){
        set=(
          <Text style={styles.notes}>Set Values:{item.set}{'\n'}</Text>
        )
      }
      if(item.value>=item.lowerLimit && item.value<=item.upperLimit){
        result=(
          <Text style={{color:'green',fontSize:13, textAlign:'center'}}>Pass</Text>
        )
      }else{
        result=(
          <Text style={{color:'red',fontSize:13, textAlign:'center'}}>Fail</Text>
        )
      }
      form=(
        <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between',paddingLeft:10}}>
          <View style={{flexDirection:'column'}}>
            <Text style={styles.notes}>{item.name}</Text>
            <Text style={styles.notes}>Limit/Tolerance: {item.lowerLimit}-{item.upperLimit}{'\n'}</Text>
            {set}
          </View>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <TextInput underlineColorAndroid='transparent' keyboardType='numeric' style={{color:'white',fontSize:12, borderBottomWidth:1, borderBottomColor:'white', width:50,height:40}} onChangeText={(value) => this.changeValue(value,item.number,this.props.apparatus)} />
            <Text style={{color:'white',fontSize:12, textAlign:'center'}}>{item.units}  </Text>
            {result}
          </View>
        </View>
      )
      globalCount+=1
      console.log(item.name,globalCount);
    }else{
      form=(
        <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between',paddingLeft:10}}>
          <View style={{flexDirection:'column',flex:1}}>
            <Text style={styles.notes}>{item.name}</Text>
            <FlatList
              style={{flex:1}}
              data={item.task}
              renderItem={({item,index})=>this.taskHandler(item,index)} //change this
              keyExtractor={(item,key) => key.toString()}
            />
          </View>
        </View>
      )
    }
    console.log('sampai')
    return(
      <View style={{flex:1,flexDirection:'column'}}>
        {form}
      </View>
    )
  }

  changeValue(value,count,apparatus){
    let setNewer=false
    if(this.props.apparatus==apparatus){
      setNewer=true
      flag=0
    }
    for(let i=0;i<apparatus.length;i++){
      if(apparatus[i].name=='Electrical Safety Analyzer'){
        continue
      }
      if(apparatus[i].task==null){
        if(count==flag){
          apparatus[i].value=value
        }
        flag+=1
      }else{
        apparatus[i].task = this.changeValue(value,count,apparatus[i].task)
      }
    }
    if(setNewer){
      this.props.setNewState({
        apparatus:apparatus
      })
    this.props.saveCurrentMaintenanceData()
    }else{
      return apparatus
    }
  }

  barcodeHandler(data){
    this.setState({
      scanning:1
    })
    let founded=false
    let newApparatus=this.props.apparatus;
    console.log(this.props.currentApparatus)
    if(this.props.apparatus[this.props.currentApparatus].qrcode==data){
      if(this.props.apparatus[this.props.currentApparatus].id==undefined){
        newApparatus[this.props.currentApparatus].id=1
        founded=true
        let message='Founded! '+this.props.apparatus[this.props.currentApparatus].name+',id=1'
        window.alert(message)
      }
    }
    if(founded){
      if(this.props.currentApparatus<this.props.apparatus.length){
        this.props.setNewState({
          currentApparatus: this.props.currentApparatus+1,
          apparatus:newApparatus
        })
      }
    }else{
      window.alert('Wrong code!')
    }
    let pass=true
    for(let i=1;i<this.props.apparatus.length;i++){
      if(this.props.apparatus[i].id==undefined){
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
        scanning:2
      })
    }else{
      this.setState({
        scanning:0
      })
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

  render(){
    let name=null;
    let pass=true
    for(let i=1;i<this.props.apparatus.length;i++){
      if(this.props.apparatus[i].id==undefined){
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
    globalCount=0
    if(this.props.currentApparatus<this.props.apparatus.length){
      name='Scan the '+this.props.apparatus[this.props.currentApparatus].name+' barcode'
    }else{
      name='Scanning process complete'
    }
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 4 - Quantitative Tasks</Text>
          <View style={{height:height/2}}>
            {scanner}
          </View>
          <Text style={styles.deviceText}>{name}</Text>
          <FlatList
            style={{flex:1}}
            data={this.props.apparatus}
            renderItem={({item,index})=>this.apparatusHandler(item,index)} //change this
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
      </ScrollView>
    )
  }
}
