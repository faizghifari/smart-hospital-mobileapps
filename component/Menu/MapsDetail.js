import React, {Component} from 'react'
import {View,Dimensions,Text,Image as ImageR,Button} from 'react-native'
import {Svg,Image,Circle,Rect,G,Text as TextS} from 'react-native-svg'
import SvgPanZoom, { SvgPanZoomElement } from 'react-native-svg-pan-zoom';
import {MIcon as Icon} from './../Utilities/Icon.js';
import {Bar} from 'react-native-pathjs-charts';

const io = require('socket.io-client')

const socket = io('http://192.168.1.137:8000/tests', {
    path: '/test'
});

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
    this.setState({
      touch:fill
    })
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

  render(){
    let data = [
      [{
        "v": 75,
        "name": "Safety"
      },
      {
        "v": 50,
        "name": "Productivity"
      },
      {
        "v": 25,
        "name": "Security"
      }]
    ]
    if(socket.disconnected){
      console.log('test')
      socket.close()
      socket.on('data', (data) => {
        console.log(data);
        this.setState({
          data:data,
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
    if(this.state.data!=null){
      for (var key in this.state.data){
        var percentageX=(this.state.data[key].cx/100)*width
        var percentageY=(this.state.data[key].cy/100)*width
        usedTranslate=percentageX.toString()+','+percentageY.toString();
        console.log(usedTranslate);
        circle.push(
          <SvgPanZoomElement
            key={key}
            x ="100%"
            y ="100%"
            onClick = {this.openDetail.bind(this,this.state.data[key].id)}
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
                  fill={this.state.data[key].condition1}
              />
              <Circle
                  cx={0}
                  cy={15}
                  r="3"
                  fill={this.state.data[key].condition2}
              />
              <Circle
                  cx={10}
                  cy={15}
                  r="3"
                  fill={this.state.data[key].condition3}
              />
              <TextS
                x="0"
                y="-5"
                fontSize="10"
                textAnchor="middle"
                scale="1.2"
              >{this.state.data[key].id}</TextS>
            </G>
          </SvgPanZoomElement>
        )
      }
    }
    if(this.state.touch==null){
      var touch=(
        <View style={{flexDirection:'column',justifyContent:'center'}}>
          <Text style={{fontSize:20,color:'white',textAlign:'center'}}>Please touch one of the device to get the detail</Text>
        </View>
      )
    }else{
      var touch=(
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <View style={styles.cardContainer}>
            <Text style={styles.titleText}>Statistics</Text>
            <View style={{flexDirection:'row'}}>
              <View style={{marginLeft:10, marginRight:10,flex:1,borderBottomColor:'black',borderBottomWidth:1}}/>
            </View>
            <View style={{justifyContent:'center', flexDirection:'row'}}>
              <View style={{flex:0.9,flexDirection:'column', justifyContent:'center'}}>
                <Text style={{fontSize:12,color:'white',textAlign:'center'}}>Item {this.state.touch} current statistic</Text>
                <Bar data={data} options={options} accessorKey='v' pallete={[
                  {'r':0,'g':125,'b':0},
                  {'r':125,'g':0,'b':0},
                  {'r':60,'g':,'b':60},

                ]}/>
                <View style={{paddingBottom:10}}>
                  <Button
                    onPress={this.detailHandle.bind(this)}
                    title={"Open device details"}
                    color="#3498db"
                    accessibilityLabel="Learn more about this purple button"
                  />
                </View>
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
            <Button transparent>
              <Icon name="arrow-back" style={{color: 'white'}}/>
            </Button>
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
