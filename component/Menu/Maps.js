import React,{Component} from 'react'
import {Dimensions} from 'react-native'
import Data from './../HospitalList.js'
import {View,Text,StatusBar,ImageBackground,TouchableOpacity,StyleSheet,FlatList,TextInput,KeyboardAvoidingView,Picker,BackHandler,DeviceEventEmitter,Image} from 'react-native'
import {Button, DatePicker} from 'native-base'
import {MIcon as Icon} from './../Utilities/Icon.js';
import MapsFloor from './MapsFloor.js';
import MapsDetail from './MapsDetail.js';
import MapsManual from './MapsManual.js';
import data from './../HospitalList.js';

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
  buttonText1:{
    fontSize:20,
    color:'white',
    fontWeight:'bold'
  },
  buttonText2:{
    fontSize:15,
    color:'white',
  },
  form:{
    marginLeft:0,
  },
  selectButton:{
    marginLeft:'3%',
    marginRight:'3%',
    backgroundColor:'rgba(0, 0, 0, 0)',
    borderColor:'white',
    borderRadius:5,
    borderWidth:1,
    marginBottom: 15
  },
  textContainer:{
    padding: 10
  },
  titleFont:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
  }
});



var datas=[
  {
    nama:"Building A",
    desc:"3 Floor"
  },{
    nama:"Building B",
    desc:"4 Floor"
  },{
    nama:"Building C",
    desc:"2 Floor"
  }
]
var datass=[
  {
    nama:"Floor 1",
    desc:"10 Room"
  },{
    nama:"Floor 2",
    desc:"5 Room"
  },{
    nama:"Floor 3",
    desc:"6 Room"
  }
]

export default class Maps extends Component{
  constructor(props){
    super(props);
    this.state={
      main:0,
      choosenBuilding:null,
      choosenFloor:null,
      choosenRoom:null
    }
    this.height=0;
    this.width=0;
  }

  componentDidMount(){
    if(this.props.user.roleId==1){
      this.setState({
        main:1
      })
    }else if (this.props.user.roleId==2 || this.props.user.roleId==3) {
      this.setState({
        main:0
      })
    }
  }

  listItem(item){
    let press=null
    if(this.state.main==1){
      press=this.detailMaps.bind(this,2,item)
    }else if (this.state.main==2) {
      press=this.detailMaps.bind(this,3,item)
    }else {
      press=this.detailMaps.bind(this,4,item)
    }
    return(
      <TouchableOpacity style={styles.selectButton} onPress={press}>
        <View style={styles.textContainer}>
          <Text style={styles.buttonText1}>{item.nama}</Text>
          <Text style={styles.buttonText2}>{item.desc}</Text>
        </View>
      </TouchableOpacity>
    )
  }



  backHandler(){
    if(this.state.main==6){
      this.setState({
        main:0
      })
    }else{
      if(this.props.user.roleId==1){
        if(this.state.main==1){
          this.props.changeMenu(0)
        }else {
          this.setState({
            main:this.state.main-1
          })
        }
      }
      if(this.props.user.roleId==2 || this.props.user.roleId==3){
        if(this.state.main==0){
          this.props.changeMenu(0)
        }else if(this.state.main==2){
          this.setState({
            main:0
          })
        }else{
          this.setState({
            main:this.state.main-1
          })
        }
      }
    }
  }

  detailMaps(index,item){
    if(this.state.main==0){
      this.setState({
        main:index
      })
    }
    else if(this.state.main==1){
      this.setState({
        main:index,
        choosenHospital:item
      })
    }else if (this.state.main==2) {
      this.setState({
        main:index,
        choosenBuilding:item
      })
    }else if (this.state.main==3){
      this.setState({
        main:index,
        choosenFloor:item
      })
    }else {
      this.setState({
        main:index,
        choosenRoom:item
      })
    }
  }

  render(){
    var title="Hospital Pakar Sultanah Fatimah, Muar"
    if(this.state.main==0){
      var header=null
      var main=(
        <View style={{flexDirection:'column',justifyContent:'center',paddingTop:15}}>
          <TouchableOpacity style={styles.selectButton} onPress={this.detailMaps.bind(this,2)}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonText1}>Live Track</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectButton} onPress={this.detailMaps.bind(this,6)}>
            <View style={styles.textContainer}>
              <Text style={styles.buttonText1}>Manual Assign Location</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }else if(this.state.main==1){
      var header=(
        <KeyboardAvoidingView style={{flex:0.1, flexDirection:'row', justifyContent:'center',alignItems:'center'}} enabled behavior='padding'>
          <View style={{flex:0.15, justifyContent:'center'}}>
            <Button transparent onPress={this.backHandler.bind(this)}>
              <Icon name="arrow-back" style={{color: 'white'}}/>
            </Button>
          </View>
          <View style={{flex:0.85,flexDirection:'row',alignItems:'center',borderRadius:10, borderColor:'white',borderWidth:1,height:40,marginRight:10,justifyContent:'space-around'}}>
            <View style={{flex:0.1}}>
              <Icon name="search" style={{color: 'white',marginLeft:10}}/>
            </View>
            <View style={{flex:0.85}}>
              <TextInput clearButtonMode='always' style={{color:'white'}} placeholder='Search State/Province' placeholderTextColor='#F5F5F5' underlineColorAndroid='transparent'/>
            </View>
          </View>
        </KeyboardAvoidingView>
      )
      var main=(
        <View style={{flex:0.9,flexDirection:'column'}}>
          <FlatList
            style={{flex:1}}
            data={data}
            renderItem={({item})=>this.listItem(item)}
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
      )
    }else if (this.state.main==2) {
      var header=(
        <View style={{flex:0.1, flexDirection:'row', justifyContent:'center'}}>
          <View style={{flex:0.15, justifyContent:'center'}}>
            <Button transparent onPress={this.backHandler.bind(this)}>
              <Icon name="arrow-back" style={{color: 'white'}}/>
            </Button>
          </View>
          <View style={{flex:0.85, justifyContent:'center'}}>
            <Text style={styles.titleFont}>{title}</Text>
          </View>
        </View>
      )
      var main=(
        <View style={{flex:0.9,flexDirection:'column'}}>
          <FlatList
            style={{flex:1}}
            data={datas}
            renderItem={({item})=>this.listItem(item)}
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
      )
    }else if (this.state.main==3) {
      var header=(
        <View style={{flex:0.1, flexDirection:'row', justifyContent:'center'}}>
          <View style={{flex:0.15, justifyContent:'center'}}>
            <Button transparent onPress={this.backHandler.bind(this)}>
              <Icon name="arrow-back" style={{color: 'white'}}/>
            </Button>
          </View>
          <View style={{flex:0.85, justifyContent:'center'}}>
            <Text style={styles.titleFont}>{title}</Text>
          </View>
        </View>
      )
      var main=(
        <View style={{flex:0.9,flexDirection:'column'}}>
          <FlatList
            style={{flex:1}}
            data={datass}
            renderItem={({item})=>this.listItem(item)}
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
      )
    }else if (this.state.main==4) {
      var header=null
      var main=(
        <MapsFloor backHandler={this.backHandler.bind(this)} title={title} detail={this.detailMaps.bind(this)} />
      )
    }else if(this.state.main==5){
      var header=null
      var main=(
        <MapsDetail backHandler={this.backHandler.bind(this)} />
      )
    }else if (this.state.main==6) {
      var header=(
        <View style={{flex:0.1, flexDirection:'row', justifyContent:'center'}}>
          <View style={{flex:0.15, justifyContent:'center'}}>
            <Button transparent onPress={this.backHandler.bind(this)}>
              <Icon name="arrow-back" style={{color: 'white'}}/>
            </Button>
          </View>
          <View style={{flex:0.85, justifyContent:'center'}}>
            <Text style={styles.titleFont}>Maps Manual Assign</Text>
          </View>
        </View>
      )
      var main=(
        <MapsManual backHandler={this.backHandler.bind(this)} />
      )
    }

    return(
      <View style={{flex:1,flexDirection:'column', backgroundColor:'#58ACE3'}}>
        <StatusBar
          backgroundColor="#3498db"
          animated={true}
          barStyle='light-content'
        />
        {header}
        {main}
      </View>
    )
  }
}
