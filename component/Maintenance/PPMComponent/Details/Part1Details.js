import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView} from 'react-native';

const styles = StyleSheet.create({
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


export default class Part1Details extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 1 - Engineer Details</Text>
          <Text style={styles.assetDetails}>• ID Number{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.data.ID}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Name{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.data.Name}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Email{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.data.Email}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Phone Number{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.data.Phone}{'\n'}</Text>
        </View>
      </ScrollView>
    )
  }
}
