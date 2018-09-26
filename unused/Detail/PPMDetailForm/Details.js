import React,{Component} from 'react';
import {PagerTabIndicator,ViewPager} from 'rn-viewpager';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,ScrollView,StatusBar,TextInput} from 'react-native';
import {CheckBox, ListItem, Body, Text as TextN,Button,Radio,Item} from 'native-base';
import {MIcon as Icon} from './../../Utilities/Icon.js';
import BarcodeScanner, {
    Exception,
    FocusMode,
    TorchMode,
    CameraFillMode,
    BarcodeType,
    pauseScanner,
    resumeScanner
} from 'react-native-barcode-scanner-google';
import Part1 from './Details/Part1.js';
import Part2 from './Details/Part2.js';

const styles = StyleSheet.create({
  formContainer:{
    backgroundColor:'#48dbfb',
  },
  partText:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
    paddingTop:20,
    paddingBottom:5
  },
  subFormContainer:{
    flexDirection:'column',
    flex:0.9
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
  button:{
    marginTop:10,
    marginLeft:'15%',
    marginRight:'15%',
    padding:10,
    backgroundColor:'rgba(0, 0, 0, 0)',
    borderColor:'white',
    borderRadius:10,
    borderWidth:1,
    marginBottom:30
  },
  buttonText:{
    fontSize:13,
    color:'white',
    textAlign:'center',
  },
  scrollContainer:{
  },
  scrollContainerContent:{
    flexDirection:'row',
    justifyContent:'center'
  },
  inspectionName: {
    color: 'white',
    fontSize: 15,
  },
  inspectionDesc:{
    color: 'white',
    fontSize: 12,
  }
})

var radio_props = [
  { label: 'PASS', value: 2 },
  { label: 'FAIL', value: 1 },
  { label: 'NA', value: 0 }
];

export default class PPMForm extends Component {
  constructor(props){
    super(props);
    this.state={
      maintenancer:{
        ID:'10000',
        Name:'Rezky Alamsyah',
        Email:'rezkyal2@gmail.com',
        Phone:'+6285718246369'
      },
      assetDetails:{
        No:'111',
        Manufacturer:'Puritan Bennet',
        Frequency:'12 Monthly',
        AssetNo:'12345',
        Model:'Puritan Bennet-840',
        Hours:'1.50'
      },
      currentPage:0,
    }
  }
  nextPage(){
    if(this.state.currentPage!=1){
      this.refs['pager'].setPage(this.state.currentPage+1);
      this.setState({
        currentPage:this.state.currentPage+1,
      })
    }
  }
  prevPage(){
    if(this.state.currentPage!=0){
      this.refs['pager'].setPage(this.state.currentPage-1);
      this.setState({
        currentPage:this.state.currentPage-1,
      })
    }
  }

  render(){
    let buttonBack=(
      <Button transparent onPress={this.prevPage.bind(this)}>
        <Icon name="arrow-back" style={{color: 'white'}}/>
        <TextN style={{color:'white'}}>Back</TextN>
      </Button>
    )
    return(
      <View style={{flex:1, backgroundColor:'#48dbfb'}}>
        <StatusBar
          backgroundColor="#48dbfb"
          animated={true}
          barStyle='light-content'
        />
        <View style={{height:60}}>
          <Text style={styles.partText}>Details{'\n'}</Text>
        </View>
        <ViewPager
          initialPage={0}
          style={{flex:1}}
          horizontalScroll={false}
          ref="pager"
        >
          <View style={styles.formContainer}>
            <Part1 data={this.state.maintenancer}/>
          </View>
          <View style={styles.formContainer}>
            <Part2 data={this.state.assetDetails}/>
          </View>
        </ViewPager>
        <View style={{height:50,backgroundColor:'#48dbfb', flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            {buttonBack}
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            <TextN style={{color:'white'}}>{this.state.currentPage+1}/2</TextN>
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
            {buttonForward}
          </View>
        </View>
      </View>
    )
  }
}
