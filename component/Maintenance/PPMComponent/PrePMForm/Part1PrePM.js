import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,ScrollView} from 'react-native';
import {CheckBox, ListItem, Body, Text as TextN} from 'native-base';

const styles = StyleSheet.create({
  formContainer:{
    backgroundColor:'#48dbfb',
  },
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
  },
})


export default class Part1PrePM extends Component {
  constructor(props){
    super(props);
  }
  sparePartCheck(index){
    let newSparePart = this.props.sparePart;
    newSparePart[index].checked = !this.props.sparePart[index].checked;
    if(this.props.sparePart[index].checked){
      newSparePart[index].id=null
    }
    this.props.setNewState({
      sparePart:newSparePart
    })
  }
  sparePartHandler(data,index){
    return(
      <ListItem style={{borderBottomWidth:0}}>
        <CheckBox checked={data.checked} onPress={this.sparePartCheck.bind(this,index)}  />
        <Body>
          <TextN style={{color:'white'}}>{data.name}</TextN>
        </Body>
      </ListItem>
    )
  }

  apparatusCheck(index){
    let newApparatus = this.props.apparatus;
    newApparatus[index].checked = !this.props.apparatus[index].checked;
    this.props.setNewState({
      apparatus:newApparatus
    })
  }
  apparatusHandler(data,index){
    return(
      <ListItem style={{borderBottomWidth:0}}>
        <CheckBox checked={data.checked} onPress={this.apparatusCheck.bind(this,index)}  />
        <Body>
          <TextN style={{color:'white'}}>{data.name}</TextN>
        </Body>
      </ListItem>
    )
  }

  render(){
    console.log(this.props.apparatus);
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 1 - Item Checklist</Text>
          <Text style={styles.subPartText}>Spare Part</Text>
          <FlatList
            style={{flex:1}}
            data={this.props.sparePart}
            renderItem={({item,index})=>this.sparePartHandler(item,index)} //change this
            keyExtractor={(item,key) => key.toString()}
          />
          <Text style={styles.subPartText}>Apparatus</Text>
          <FlatList
            style={{flex:1}}
            data={this.props.apparatus}
            renderItem={({item,index})=>this.apparatusHandler(item,index)} //change this
            keyExtractor={(item,key) => key.toString()}
          />
        </View>
      </ScrollView>
    )
  }
}
