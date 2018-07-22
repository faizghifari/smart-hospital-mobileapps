import React,{Component} from 'react'
import {View,
        Text,
        StatusBar,
        ImageBackground,
        TouchableOpacity,
        StyleSheet,
        FlatList,
        TextInput,
        KeyboardAvoidingView,
        Picker,
        BackHandler,
        DeviceEventEmitter,
        Image as ImageR,
        Dimensions} from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom';
import {Button, DatePicker} from 'native-base'
import {MIcon as Icon} from './../Utilities/Icon.js';
import {Svg,Image,Circle} from 'react-native-svg'
import SvgPanZoom, { SvgPanZoomElement } from 'react-native-svg-pan-zoom';

var datas=[
  {
    nama:'Room 1',
    desc:'10 Devices',
  },
  {
    nama:'Room 2',
    desc:'9 Devices'
  },
  {
    nama:'Room 3',
    desc:'15 Devices'
  },
  {
    nama:'Room 4',
    desc:'15 Devices'
  },
  {
    nama:'Room 5',
    desc:'15 Devices'
  },
]

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

const io = require('socket.io-client')

const socket = io('http://192.168.1.137:8000/tests', {
    path: '/test'
});


export default class MapsFloor extends Component{
  constructor(props){
    super(props);
    this.state={
      width:0,
      height:0,
      data:null,
      touch:null,
    }
  }
  componentWillMount(){
    ImageR.getSize("https://www.piedmont.org/media/Image/Campus-Map-Newton-1.jpg", (width, height) => {this.setState({
      width:width,
      height:height
    })});
  }
  componentDidMount(){
    socket.on('data', (data) => {
      console.log(data);
      this.setState({
        data:data,
      });
    });
  }
  componentWillUnmount(){
    socket.close()
  }
  listItem(item){
    return(
      <TouchableOpacity style={styles.selectButton} onPress={this.props.detail.bind(this)}>
        <View style={styles.textContainer}>
          <Text style={styles.buttonText1}>{item.nama}</Text>
          <Text style={styles.buttonText2}>{item.desc}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  render(){
    var circle = []
    if(this.state.data!=null){
      for (var key in this.state.data){
        var percentageX=(this.state.data[key].cx).toString()+"%"
        var percentageY=(this.state.data[key].cy).toString()+"%"
        circle.push(
          <SvgPanZoomElement
            key={key}
            x ="100%"
            y ="100%"
          >
            <Circle
                cx={percentageX}
                cy={percentageY}
                r="3"
                fill={this.state.data[key].fill}
            />
          </SvgPanZoomElement>
        )
      }
    }
    console.log(this.state.width,this.state.height)
    if(this.state.width != 0 && this.state.height!=0){
      if(this.state.width>this.state.height){
        console.log('1');
        var usedWidth=Dimensions.get('window').width;
        var usedHeight=this.state.height*(Dimensions.get('window').width/this.state.width);
      }else{
        var usedWidth=this.state.width*((Dimensions.get('window').height/2)/this.state.height);
        var usedHeight=Dimensions.get('window').height/2;
      }
    }else {
      var usedWidth=1
      var usedHeight=1
    }
    console.log(usedWidth,usedHeight);
    return(
      <View style={{flex:1,flexDirection:'column', backgroundColor:'#3498db'}}>
        <View style={{flex:0.1, flexDirection:'row', justifyContent:'center'}}>
          <View style={{flex:0.15, justifyContent:'center'}}>
            <Button transparent>
              <Icon name="arrow-back" style={{color: 'white'}}/>
            </Button>
          </View>
          <View style={{flex:0.85, justifyContent:'center'}}>
            <Text style={styles.titleFont}>{this.props.title}</Text>
          </View>
        </View>
        <View style={{flex:0.9,flexDirection:'column'}}>
          <View style={{flexDirection:'row', justifyContent:'center'}}>
            <View style = {{ width: usedWidth, height:usedHeight }}>
              <SvgPanZoom
                canvasWidth={usedWidth}
                canvasHeight={usedHeight}
                minScale      = {1.0}
                maxScale      = {5.0}
                initialZoom   = {1.0}
                canvasStyle   = {{ backgroundColor: 'yellow' }}
                viewStyle     = {{ backgroundColor: 'white'  }}
              >
                  <Image
                    width="100%"
                    height="100%"
                    href={{uri:"https://www.piedmont.org/media/Image/Campus-Map-Newton-1.jpg"}}
                    x="0%"
                    y="0%"
                  />
                  {circle}
              </SvgPanZoom>
            </View>
          </View>
          <FlatList
            style={{flex:1}}
            data={datas}
            renderItem={({item})=>this.listItem(item)}
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
      </View>
    )
  }
}
