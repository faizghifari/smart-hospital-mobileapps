import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,ScrollView,StatusBar} from 'react-native';
import {MIcon as Icon} from './../Reuseable/Utilities/Icon.js';
import {Button,Text as TextN} from 'native-base';

const styles = StyleSheet.create({
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
  subPartSection:{
    fontWeight:'bold',
    fontSize:14,
    textAlign:'center',
    color:'white',
    paddingBottom:7,
  },
  scrollContainer:{
  },
  scrollContainerContent:{
    flexDirection:'row',
    justifyContent:'center'
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
  partText:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
    paddingTop:20,
    paddingBottom:5
  },
  notes:{
    color: 'white',
    fontSize: 12,
  },
})

export default class DetailPastPPM extends Component{
  constructor(props){
    super(props);
    this.state={
      finish:false
    }
  }
  sparePart(item,index){
    let used=null
    if(item.used){
      used="used"
    }else{
      used="unused"
    }
    return(
      <View>
        <Text style={styles.assetDetails}>{index+1}. {item.name} - {used}{'\n'}</Text>
        <Text style={styles.subAssetDetails}>Item ID: {item.id}{'\n'}</Text>
      </View>
    )
  }
  finish(){
    this.setState({
      finish:!this.state.finish
    })
  }
  taskHandler(item,index){
    console.log('ulol',item)
    let set=null
    let form=null
    if(item.units!=null){
      if(item.set!=null){
        set=(
          <Text style={styles.notes}>Set Values:{item.set}{'\n'}</Text>
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
            <Text style={{color:'white',fontSize:12, textAlign:'center'}}>{item.value} {item.units}</Text>
          </View>
        </View>
      )
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
    return(
      <View style={{flex:1,flexDirection:'column'}}>
        {form}
      </View>
    )
  }
  apparatus(item,index){
    if(index==0){
      return(
        null
      )
    }
    return(
      <View style={{flexDirection:'column'}}>
        <Text style={styles.assetDetails}>{index+1}. {item.name}{'\n'}</Text>
        <Text style={styles.subAssetDetails}>ID: {item.id}{'\n'}</Text>
        <Text style={styles.subAssetDetails}>Task:{'\n'}</Text>
        <FlatList
          style={{flex:1}}
          data={item.task}
          renderItem={({item,index})=>this.taskHandler(item,index)} //change this
          keyExtractor={(item,key) => key.toString()}
        />
      </View>
    )
  }
  inspection(item,index){
    return(
      <View>
        <Text style={styles.assetDetails}>{index+1}. {item.name}{'\n'}</Text>
        <Text style={styles.subAssetDetails}>Value: {item.value}{'\n'}</Text>
      </View>
    )
  }
  pmt(item,index){
    return(
      <View>
        <Text style={styles.assetDetails}>{index+1}. {item.name}{'\n'}</Text>
        <Text style={styles.subAssetDetails}>Value: {item.value}{'\n'}</Text>
      </View>
    )
  }
  render(){
    console.log('review',this.props.data);
    let buttonForward=null
    let whiteStrip=(
      <View
        style={{
          borderBottomColor: 'white',
          borderBottomWidth: 2,
          marginTop:10,
          marginBottom:10
        }}
      />
    )
    console.log('this',this.props.data.dataDevice);
    return(
      <View style={{flex:1, backgroundColor:'#48dbfb'}}>
        <StatusBar
          backgroundColor="#48dbfb"
          animated={true}
          barStyle='light-content'
        />
        <View style={{height:60}}>
          <Button transparent onPress={this.props.selectDetail.bind(this,5)}>
            <Icon name="arrow-back" style={{color: 'white'}}/>
            <TextN style={{color:'white'}}>Back</TextN>
          </Button>
          <Text style={styles.partText}>Details{'\n'}</Text>
        </View>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
          <View style={styles.subFormContainer}>
            <Text style={styles.subPartSection}>1. Maintenancer Details</Text>
            <Text style={styles.assetDetails}>• ID Number{'\n'}</Text>
            <Text style={styles.subAssetDetails}>{this.props.data.maintenancer.ID}{'\n'}</Text>
            <Text style={styles.assetDetails}>• Name{'\n'}</Text>
            <Text style={styles.subAssetDetails}>{this.props.data.maintenancer.Name}{'\n'}</Text>
            <Text style={styles.assetDetails}>• Email{'\n'}</Text>
            <Text style={styles.subAssetDetails}>{this.props.data.maintenancer.Email}{'\n'}</Text>
            <Text style={styles.assetDetails}>• Phone Number{'\n'}</Text>
            <Text style={styles.subAssetDetails}>{this.props.data.maintenancer.Phone}{'\n'}</Text>
            {whiteStrip}
            <Text style={styles.subPartSection}>2. Asset Details</Text>
            <Text style={styles.assetDetails}>• Work Order No{'\n'}</Text>
            <Text style={styles.subAssetDetails}>{this.props.data.assetDetails.No}{'\n'}</Text>
            <Text style={styles.assetDetails}>• Manufacturer{'\n'}</Text>
            <Text style={styles.subAssetDetails}>{this.props.data.assetDetails.Manufacturer}{'\n'}</Text>
            <Text style={styles.assetDetails}>• Frequency{'\n'}</Text>
            <Text style={styles.subAssetDetails}>{this.props.data.assetDetails.Frequency}{'\n'}</Text>
            <Text style={styles.assetDetails}>• Asset No{'\n'}</Text>
            <Text style={styles.subAssetDetails}>{this.props.data.assetDetails.AssetNo}{'\n'}</Text>
            <Text style={styles.assetDetails}>• Model{'\n'}</Text>
            <Text style={styles.subAssetDetails}>{this.props.data.assetDetails.Model}{'\n'}</Text>
            <Text style={styles.assetDetails}>• PPM Hours{'\n'}</Text>
            <Text style={styles.subAssetDetails}>{this.props.data.assetDetails.Hours}{'\n'}</Text>
            {whiteStrip}
            <Text style={styles.subPartSection}>3. Spare Part Details</Text>
            <FlatList
              style={{flex:1}}
              data={this.props.data.sparePart}
              renderItem={({item,index})=>this.sparePart(item,index)} //change this
              keyExtractor={(item,key) => key.toString()}
            />
            {whiteStrip}
            <Text style={styles.subPartSection}>4. Apparatus Details</Text>
            <Text style={styles.assetDetails}>1. Electrical Safety Analyzer{'\n'}</Text>
            <Text style={styles.subAssetDetails}>ID: {this.props.data.apparatus[0].id}{'\n'}</Text>
            <Text style={styles.subAssetDetails}>Limit: {this.props.data.apparatus[0].threshold}{'\n'}</Text>
            <Text style={styles.subAssetDetails}>Value: {this.props.data.apparatus[0].value}{'\n'}</Text>
            <FlatList
              style={{flex:1}}
              data={this.props.data.apparatus}
              renderItem={({item,index})=>this.apparatus(item,index)} //change this
              keyExtractor={(item,key) => key.toString()}
            />
            {whiteStrip}
            <Text style={styles.subPartSection}>5. Visual Inspection</Text>
            <FlatList
              style={{flex:1}}
              data={this.props.data.VIdata}
              renderItem={({item,index})=>this.inspection(item,index)} //change this
              keyExtractor={(item,key) => key.toString()}
            />
            {whiteStrip}
            <Text style={styles.subPartSection}>6. Technical Inspection</Text>
            <FlatList
              style={{flex:1}}
              data={this.props.data.TIdata}
              renderItem={({item,index})=>this.inspection(item,index)} //change this
              keyExtractor={(item,key) => key.toString()}
            />
            {whiteStrip}
            <Text style={styles.subPartSection}>7. Preventive Maintenance Tasks</Text>
            <FlatList
              style={{flex:1}}
              data={this.props.data.PMTdata}
              renderItem={({item,index})=>this.pmt(item,index)} //change this
              keyExtractor={(item,key) => key.toString()}
            />
            {whiteStrip}
            <Text style={styles.subPartSection}>8. Notes</Text>
            <Text style={styles.notes}>{this.props.data.notes}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
