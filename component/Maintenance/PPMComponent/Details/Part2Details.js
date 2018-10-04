import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView} from 'react-native';

const styles = StyleSheet.create({
  formContainer:{
    backgroundColor:'#48dbfb',
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

  scrollContainer:{
  },
  scrollContainerContent:{
    flexDirection:'row',
    justifyContent:'center'
  },
})


export default class Part2Details extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 2 - Asset Details</Text>
          <Text style={styles.assetDetails}>• Work Order No{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.data.No}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Name{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.data.Name}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Manufacturer{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.data.Manufacturer}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Frequency{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.data.Frequency}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Asset No{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.data.AssetNo}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Model{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.data.Model}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Maintenance Hours{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.data.Hours}{'\n'}</Text>
        </View>
      </ScrollView>
    )
  }
}
