import React, {Component} from 'react';
import {StyleSheet,
        View,
        Text,
        TouchableOpacity,
        Image,
        LayoutAnimation,
        Platform,
        UIManager,
} from 'react-native';

const styles = StyleSheet.create({
  mainPage:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#F0F0F0',
    justifyContent:'center',
    alignItems:'center',
  },
  cardContainer:{
    marginTop:10,
    flexDirection:'column',
    flex:0.95,
    backgroundColor: 'white',
    elevation: 3,
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 2,
    marginBottom: 8
  },
  titleText:{
    paddingBottom:5,
    paddingTop:5,
    textAlign:'center',
    fontSize:15,
    fontWeight:'bold'
  },
  legendText:{
    fontSize: 12,
    textAlign:'center',
  }
})

var CustomLayoutSpring = {
    duration: 200,
    create: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.scaleXY,
      springDamping: 0.7,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.7,
    },
  };



export default class AssetDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      shrink:true
    }
    if (Platform.OS==='android'){
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  expandFull(){
    LayoutAnimation.configureNext(CustomLayoutSpring);
    this.setState({
      shrink: !this.state.shrink
    })
  }
  render(){
    if(this.state.shrink==true){
      var main=(
        <View style={{marginLeft:20}}>
          <Text style={{fontSize:14, fontWeight:'bold'}}>Default location{'\n'}</Text>
          <Text style={{fontSize:14}}>   Rumah Sakit ABCD -> Building A -> Floor 3 -> Room Rose{'\n'}</Text>
          <Text style={{fontSize:11, marginTop:10, marginBottom:10,marginLeft:-20, textAlign:'center'}}>Tap to expand</Text>
        </View>
      )
    }else{
      var main=(
        <View style={{marginLeft:20}}>
          <Text style={{fontSize:14, fontWeight:'bold'}}>Description{'\n'}</Text>
          <Text style={{fontSize:14}}>   A general-purpose ultrasound scanner may be used for most imaging purposes. Usually specialty applications may be served only by use of a specialty transducer. Most ultrasound procedures are done using a transducer on the surface of the body, but improved diagnostic confidence is often possible if a transducer can be placed inside the body. For this purpose, specialty transducers, including endovaginal, endorectal, and transesophageal transducers are commonly employed. At the extreme of this, very small transducers can be mounted on small diameter catheters and placed into blood vessels to image the walls and disease of those vessels.{'\n'}</Text>
          <Text style={{fontSize:14, fontWeight:'bold'}}>Default location{'\n'}</Text>
          <Text style={{fontSize:14}}>   ABCD Hospital -> Building A -> Floor 3 -> Room Rose{'\n'}</Text>
          <Text style={{fontSize:14, fontWeight:'bold'}}>Production Date{'\n'}</Text>
          <Text style={{fontSize:14}}>   13-07-18{'\n'}</Text>
          <Text style={{fontSize:14, fontWeight:'bold'}}>Asset Value{'\n'}</Text>
          <Text style={{fontSize:14}}>   15000 RM{'\n'}</Text>
          <Text style={{fontSize:14, fontWeight:'bold'}}>Manufacture{'\n'}</Text>
          <Text style={{fontSize:14}}>   AAA LC{'\n'}</Text>
          <Text style={{fontSize:14, fontWeight:'bold'}}>Category{'\n'}</Text>
          <Text style={{fontSize:14}}>   Medical Equipment{'\n'}</Text>
          <Text style={{fontSize:14, fontWeight:'bold'}}>Eq Type{'\n'}</Text>
          <Text style={{fontSize:14}}>   Medical Equipment{'\n'}</Text>
          <Text style={{fontSize:11, marginTop:10, marginBottom:10,marginLeft:-20, textAlign:'center'}}>Tap to shrink</Text>
        </View>
      )
    }
    return(
      <View style={{flexDirection:'row', justifyContent:'center'}}>
        <TouchableOpacity onPress={this.expandFull.bind(this)} style={styles.cardContainer}>
          <Text style={styles.titleText}>Ultrasound Scanner</Text>
          <View style={{flexDirection:'row'}}>
            <View style={{marginLeft:10, marginRight:10,flex:1,borderBottomColor:'black',borderBottomWidth:1}}/>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
            <Image style={{margin:15,width:160, height:120}} source={{uri:'https://upload.wikimedia.org/wikipedia/commons/b/b3/AlokaPhoto2006a.jpg'}}/>
          </View>
          {main}
        </TouchableOpacity>
      </View>
    )
  }
}
