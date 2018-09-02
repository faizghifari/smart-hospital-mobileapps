import React,{Component} from 'react';
import RadioForm from 'react-native-simple-radio-button';
import {View,Text,StyleSheet,FlatList,ScrollView} from 'react-native';

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
  inspectionName: {
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

var radio_props = [
  { label: 'DONE', value: 'Done' },
  { label: 'NOT DONE**', value: 'Not Done' },
  { label: 'NA*', value: 'NA' }
];



export default class Part7Main extends Component {
  constructor(props){
    super(props);
  }

  changeValue(value,index){
    let newSparePart = this.props.sparePart;
    let newPMTdata = this.props.PMTdata;
    let replace = this.props.PMTdata[index].name.split(" ");
    let item=""
    console.log(replace);
    newPMTdata[index].value=value;
    // if(value=='Done'){
    //   if(replace[0]=='Replace'){
    //     for(let i=1;i<replace.length;i++){
    //       if(i==replace.length-1){
    //         item=item+replace[i]
    //       }else{
    //         item=item+replace[i]+" "
    //       }
    //
    //     }
    //     for(let i=0;i<this.props.sparePart.length;i++){
    //       console.log(item)
    //       if(this.props.sparePart[i].name==item){
    //         if(this.props.sparePart[i].checked==value){
    //             newSparePart[i].used=true
    //         }else{
    //             newPMTdata[i].value='NA'
    //         }
    //       }
    //     }
    //   }
    // }
    this.props.setNewState({ PMTdata: newPMTdata, sparePart: newSparePart })
    this.props.saveCurrentMaintenanceData()
  }

  renderPMT(item,index){
    let initial=null
    if(this.props.PMTdata[index].value==undefined){
      initial=-1
    }else if (this.props.PMTdata[index].value=='Done'){
      initial=0
    }else if (this.props.PMTdata[index].value=='Not Done') {
      initial=1
    }else if (this.props.PMTdata[index].value=='NA') {
      initial=2
    }
    return(
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginBottom:4 }}>
        <View style={{flex:0.4,flexDirection:'column',justifyContent:'flex-start'}}>
          <Text style={styles.inspectionName}>{item.name}</Text>
        </View>
        <RadioForm
          style={{flex:0.6, justifyContent:'flex-end'}}
          formHorizontal={true}
          radio_props={radio_props}
          labelHorizontal={false}
          initial={initial}
          buttonInnerColor={'white'}
          buttonColor={'white'} labelColor={'white'} selectedButtonColor={'white'} selectedLabelColor={'white'}
          onPress={(value) => this.changeValue(value,index)}
        />
      </View>
    )
  }


  render(){
    return(
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainerContent}>
        <View style={styles.subFormContainer}>
          <Text style={styles.subPartText}>Part 7 - Preventive Maintenance Tasks</Text>
          <FlatList
            style={{flex:1}}
            data={this.props.PMTdata}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item,index }) => this.renderPMT(item,index)}
          />
          <Text style={styles.notes}>Notes:{'\n'}</Text>
          <Text style={styles.subNotes}>*For all parts, NA defined as NOT APPLICABLE{'\n'}</Text>
          <Text style={styles.subNotes}>**If you havve ticked 'NOT DONE', then input relevant remarks in Part 8{'\n'}</Text>
          <Text style={styles.subNotes}>***Choose whichever applicable. Please indicate in Part 8 for any part replaced{'\n'}</Text>
        </View>
      </ScrollView>
    )
  }
}
