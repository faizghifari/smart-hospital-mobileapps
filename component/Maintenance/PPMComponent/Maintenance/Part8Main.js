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
  scrollContainer:{
  },
  scrollContainerContent:{
    flexDirection:'row',
    justifyContent:'center'
  }
})

export default class Part8Main extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 8 - Notes</Text>
          <TextInput style={{color:'white',fontSize:14, borderBottomWidth:1, borderBottomColor:'white'}} defaultValue={this.props.notes} underlineColorAndroid='transparent' multiline={true} editable={true} maxLength={200} onChangeText={(notes) => this.props.setNewState({notes})}  />
        </View>
      </ScrollView>
    )
  }
}
