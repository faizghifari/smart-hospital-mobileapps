import React, {Component} from 'react'
import {View,Dimensions,Text,Image as ImageR,Button} from 'react-native'
import {Button as ButtonN} from 'native-base'
import {Svg,Image,Circle,Rect,G,Text as TextS} from 'react-native-svg'
import SvgPanZoom, { SvgPanZoomElement } from 'react-native-svg-pan-zoom';
import {MIcon as Icon} from './../Utilities/Icon.js';
import {Bar} from 'react-native-pathjs-charts';

const io = require('socket.io-client')

const socket = io('http://178.128.98.118/equipment/position/');

const {height, width} = Dimensions.get('window');


export default class Maps extends Component{
  constructor(props){
    super(props)
    this.state={
      width:0,
      height:0,
      data:null,
      touch:null,
    }
  }
  openDetail(fill){
    console.log(this.state.touch);
    this.setState({
      touch:fill
    })
  }
  componentWillUnmount(){
    socket.close()
  }

  render(){
    if(socket.disconnected){
      console.log(this.state.touch)
      console.log(socket.disconnected);
      console.log('test')
      socket.on('position/1', (data) => {
        used=JSON.parse(data);
        console.log(used);
        this.setState({
          data:used,
        });
      });
    }
    console.log(socket);
    var resolveAssetSource = require('resolveAssetSource');
    let icon =  require('../../assets/0.png');
    let source = resolveAssetSource(icon);
    var imageX=width
    var imageY=width
    var circle = []
    var maxLong = 5000
    var maxLat = 15000
    // var deltaX = 0.223*maxLong;
    // var deltaY = 0.357*maxLat;
    var deltaX = 0.761*maxLong;
    var deltaY = 0.878*maxLat;
    if(this.state.data!=null){
        console.log(width);
      // for (var key in this.state.data){
        // var percentageX=((this.state.data[key].longitude/1690)*100);
        // var percentageY=((this.state.data[key].latitude/2000)*100);
        // var percentageX=(((0.663*maxLong)+(((this.state.data.longitude*1000/maxLong)*deltaX)))/maxLong)*width;
        // var percentageY=((maxLat-(((this.state.data.latitude*1000/maxLat)*deltaY)))/maxLat)*width;
        // var percentageX=(((0.874*maxLong)-(((this.state.data.longitude*1000/maxLong)*deltaX)))/maxLong)*width;
        // var percentageY=(((0.654*maxLat)+(((this.state.data.latitude*1000/maxLat)*deltaY)))/maxLat)*width;
        var percentageX=(((((this.state.data.longitude*1000/maxLong)*deltaX)))/maxLong)*width;
        var percentageY=(((0.939*maxLat)-(((this.state.data.latitude*1000/maxLat)*deltaY)))/maxLat)*width;
        // var percentageX=180;
        // var percentageY=180;
        console.log(percentageX,percentageY);
        usedTranslate=percentageX.toString()+','+percentageY.toString();
        console.log(usedTranslate);

        if(!this.state.data.inside_room){
          var fill1="red"
        }else{
          var fill1="green"
        }
        if(false){
          var fill2="red"
        }else{
          var fill2="green"
        }
        if(fill1=='green'&&fill2=='green'){
          var fill3='green'
        }else{
          var fill3='red'
        }
        circle.push(
          <SvgPanZoomElement
            key={1}
            x ="100%"
            y ="100%"
            onClick = {this.openDetail.bind(this,this.state.data)}
          >
            <G
              transform={{translate:usedTranslate}}
            >
              <Rect
                x={-10}
                y={-10}
                width="20"
                height="20"
                fill="white"
                strokeWidth="3"
                stroke="rgb(0,0,0)"
              />
              <Circle
                  cx={-10}
                  cy={15}
                  r="3"
                  fill={fill1}
              />
              <Circle
                  cx={0}
                  cy={15}
                  r="3"
                  fill={fill2}
              />
              <Circle
                  cx={10}
                  cy={15}
                  r="3"
                  fill={fill3}
              />
              <TextS
                x="0"
                y="-5"
                fontSize="10"
                textAnchor="middle"
                scale="1.2"
              >{this.state.data.equipment_id}</TextS>
            </G>
          </SvgPanZoomElement>
        )
      // }
    }
    if(this.state.touch==null){
      var touch=(
        <View style={{flexDirection:'column',justifyContent:'center'}}>
          <Text style={{fontSize:20,color:'white',textAlign:'center'}}>Please touch one of the device to get the detail</Text>
        </View>
      )
    }else{
      console.log('loh');
      if(!this.state.data.inside_room){
        var fill1D="red"
      }else{
        var fill1D="green"
      }
      if(false){
        var fill2D="red"
      }else{
        var fill2D="green"
      }
      if(fill1D=='green'&&fill2D=='green'){
        var fill3D='green'
        var status='good'
      }else{
        var fill3D='red'
        var status='bad'
      }
      if(false){
        var fill4D="red"
      }else{
        var fill4D="green"
      }
      var touch=(
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <View style={{justifyContent:'center', flexDirection:'row'}}>
            <View style={{flex:0.9,flexDirection:'column', justifyContent:'center'}}>
              <Text style={{fontSize:12,color:'white',textAlign:'center'}}>Item 1 current statistic</Text>
              <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <View style={{flexDirection:'column',justifyContent:'center'}}>
                  <Text style={{fontSize:30,color:fill1D,textAlign:'center'}}>50%{'\n'}</Text>
                  <Text style={{fontSize:10,color:'white',textAlign:'center'}}>Security</Text>
                </View>
                <View style={{flexDirection:'column',justifyContent:'center'}}>
                  <Text style={{fontSize:30,color:fill4D,textAlign:'center'}}>50%</Text>
                  <Text style={{fontSize:10,color:'white',textAlign:'center'}}>Productivity</Text>
                </View>
                <View style={{flexDirection:'column',justifyContent:'center'}}>
                  <Text style={{fontSize:30,color:fill2D,textAlign:'center'}}>50%{'\n'}</Text>
                  <Text style={{fontSize:10,color:'white',textAlign:'center'}}>Safety</Text>
                </View>
              </View>
              <Text style={{fontSize:12,color:'white',textAlign:'center'}}>Device in <Text style={{color:fill3D}}>{status}</Text> status to use</Text>
              <View style={{paddingBottom:10,paddingTop:15}}>
                <Button
                  onPress={()=>console.log('lululululul')}
                  title={"Open device details"}
                  color="#3498db"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
            </View>
          </View>
        </View>
      )
    }
    return(
      <View style={{flex:1,flexDirection:'column', backgroundColor:'#3498db'}}>
        <View style={{flex:0.1, flexDirection:'row', justifyContent:'center'}}>
          <View style={{flex:0.15, justifyContent:'center'}}>
            <ButtonN transparent onPress={this.props.backHandler.bind(this)}>
              <Icon name="arrow-back" style={{color: 'white'}}/>
            </ButtonN>
          </View>
          <View style={{flex:0.85, justifyContent:'center'}}>
            <Text style={{
                color:'white',
                fontSize:20,
                fontWeight:'bold'
              }}>Hospital Model</Text>
          </View>
        </View>
        <View style={{flex:0.9,flexDirection:'column'}}>
          <View
            width={imageX}
            height={imageY}
          >
            <SvgPanZoom
              canvasWidth={imageX}
              canvasHeight={imageY}
              minScale      = {1.0}
              maxScale      = {4.0}
              initialZoom   = {1.0}
              onZoom        = {(zoom) => { console.log('onZoom:' + zoom) }}
              canvasStyle   = {{ backgroundColor: 'yellow' }}
              viewStyle     = {{ backgroundColor: 'white'  }}
            >
              <Image
                width="100%"
                height="100%"
                href={require('../../assets/0.png')}
                x="0%"
                y="0%"
              />
              {circle}
            </SvgPanZoom>
          </View>
          {touch}
        </View>
      </View>
    )
  }
}
