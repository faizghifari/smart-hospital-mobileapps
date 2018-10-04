import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList} from 'react-native';

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


export default class Part3Details extends Component {
  constructor(props){
    super(props);
  }

  sparePart(item,index){
    return(
      <Text style={styles.subAssetDetails}>{index+1}. {item.name} x {item.qty}{'\n'}</Text>
    )
  }

  render(){
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 3 - CM Details</Text>
          <Text style={styles.assetDetails}>• Requestor{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.data.Name}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Root Cause{'\n'}</Text>
          <Text style={styles.subAssetDetails}>{this.props.data.Desc}{'\n'}</Text>
          <Text style={styles.assetDetails}>• Spare Part Included{'\n'}</Text>
          <FlatList
            style={{flex:1}}
            data={this.props.data.SparePart}
            renderItem={({item,index})=>this.sparePart(item,index)} //change this
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
      </ScrollView>
    )
  }
}
