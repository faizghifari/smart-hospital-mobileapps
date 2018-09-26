import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,ScrollView,TextInput} from 'react-native';

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
})

export default class Part10 extends Component{
  constructor(props){
    super(props);
  }
  testApparatus(item,index){
    return(
      <View>
        <Text style={styles.assetDetails}>{item.deviceName}</Text>
        <Text style={styles.subAssetDetails}>Serial No: 100{'\n'}</Text>
        <Text style={styles.subAssetDetails}>Calibration due on: 10-10-18{'\n'}</Text>
      </View>
    )
  }
  renderVisual(item,index){
    let result=null

    return(
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginBottom:4 }}>
        <View style={{flex:0.6,flexDirection:'column',justifyContent:'flex-start'}}>
          <Text style={styles.inspectionName}>{item.name}</Text>
        </View>
        <View style={{flex:0.6,flexDirection:'column',justifyContent:'center'}}>
          <Text style={styles.inspectionName}></Text>
        </View>

      </View>
    )
  }
  render(){
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
    console.log('this',this.props.dataDevice);
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 10 - Review + Result</Text>
          <Text style={styles.subPartSection}>Maintenancer Details</Text>
          <Text style={styles.assetDetails}>• ID Number{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.maintenancer.ID}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Name{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.maintenancer.Name}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Email{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.maintenancer.Email}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Phone Number{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.maintenancer.Phone}{'\n'}</Text>
          {whiteStrip}
          <Text style={styles.subPartSection}>Asset Details</Text>
          <Text style={styles.assetDetails}>• Work Order No{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.assetDetails.No}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Manufacturer{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.assetDetails.Manufacturer}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Frequency{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.assetDetails.Frequency}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Asset No{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.assetDetails.AssetNo}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Model{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.assetDetails.Model}{'\n'}</Text>
          <Text style={styles.assetDetails}>• PPM Hours{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.assetDetails.Hours}{'\n'}</Text>
          {whiteStrip}
          <Text style={styles.subPartSection}>Test Apparatus</Text>
          <FlatList
            style={{flex:1}}
            data={this.props.dataDevice}
            renderItem={({item,index})=>this.testApparatus(item,index)} //change this
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
      </ScrollView>
    )
  }
}
