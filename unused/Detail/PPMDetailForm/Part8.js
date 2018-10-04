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
  },
  taskName: {
    color: 'white',
    fontSize: 13,
  },
  taskNameBold: {
    fontWeight:'bold',
    color: 'white',
    fontSize: 13,
  },
  notes:{
    color: 'white',
    fontSize: 12,
  },
  subNotes:{
    fontStyle:'italic',
    fontSize: 12,
    color:'white'
  }
})


export default class Part7 extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let newQuanValue=this.props.quanValue;
    for (i=0;i<this.props.quanValue.length;i++){
      if(this.props.quanData[i].Units==null){
        newQuanValue[i]=-1
      }
    }
    this.props.setNewState({
      quanValue:newQuanValue
    })
  }

  changeValue(value,index){
    let newQuanPass = this.props.quanPass;
    if(value>=this.props.quanData[index].LimitBelow && this.props.quanValue[index]<=this.props.quanData[index].LimitAbove){
      newQuanPass[index]=true
    }else{
      newQuanPass[index]=false
    }
    let newQuanValue=this.props.quanValue;
    newQuanValue[index]=value;
    this.props.setNewState({
      quanPass:newQuanPass,
      quanValue:newQuanValue
    })
  }

  renderQuan(item,index){
    let desc=null;
    let form=null;
    let set=null;
    let result=null;
    if(item.Bold){
      desc=(
        <Text style={styles.taskNameBold}>• {item.Desc}</Text>
      )
    }else {
      desc=(
        <Text style={styles.taskName}>   ‣ {item.Desc}</Text>
      )
    }
    if(item.Units!=null){
      if(this.props.quanValue[index]>=this.props.quanData[index].LimitBelow && this.props.quanValue[index]<=this.props.quanData[index].LimitAbove){
        result=(
          <Text style={{color:'green',fontSize:15, textAlign:'center'}}>Pass</Text>
        )
      }else{
        result=(
          <Text style={{color:'red',fontSize:15, textAlign:'center'}}>Fail</Text>
        )
      }
      if(item.Set!=null){
        set=(
          <Text style={styles.notes}>Set Values:{item.Set}{'\n'}</Text>
        )
      }
      form=(
        <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between',paddingLeft:10}}>
          <View style={{flexDirection:'column'}}>
            <Text style={styles.notes}>Limit/Tolerance: {item.LimitBelow}-{item.LimitAbove}{'\n'}</Text>
            {set}
          </View>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
            <TextInput underlineColorAndroid='transparent' keyboardType='numeric' style={{color:'white',fontSize:12, borderBottomWidth:1, borderBottomColor:'white', width:80,height:40}} onChangeText={(value) => this.changeValue(value,index)} />
            <Text style={{color:'white',fontSize:13, textAlign:'center'}}>{item.Units}</Text>
          </View>
          {result}
        </View>
      )
    }
    return(
      <View style={{flex:1,flexDirection:'column',padding:10}}>
        {desc}
        {form}
      </View>
    )
  }


  render(){
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 8 - Quantitative Tasks</Text>
          <FlatList
            style={{flex:1}}
            data={this.props.quanData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item,index }) => this.renderQuan(item,index)}
          />
        </View>
      </ScrollView>
    )
  }
}
