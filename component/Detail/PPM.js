import React, {Component} from 'react';
import {View} from 'react-native';
import {ViewPager} from 'rn-viewpager';
import Details from './PPMComponent/Details.js';
import PrePMForm from './PPMComponent/PrePMForm.js';
import Maintenance from './PPMComponent/Maintenance.js';
import Review from './PPMComponent/Review.js';


export default class PPM extends Component{
  constructor(props){
    super(props)
    this.state={
      maintenancer:{
        ID:'10000',
        Name:'Rezky Alamsyah',
        Email:'rezkyal2@gmail.com',
        Phone:'+6285718246369'
      },
      assetDetails:{
        No:'111',
        Name:'Ventilators',
        Manufacturer:'Puritan Bennet',
        Frequency:'12 Monthly',
        AssetNo:'12345',
        Model:'Puritan Bennet-840',
        Hours:'1.50'
      },
      main:0,
      currentPage:[
        0,
        0,
        0,
      ],
      precaution:[
        false,false,false
      ],
      sparePart:[
        {
          name:'Battery',
          typeId:'1',
        },{
          name:'Bellows',
          typeId:'123',
        }
      ],
      apparatus:[
        {
          name:'Electrical Safety Analyzer',
          id:'5',
          threshold: 10
        },{
          name:'Ventilator Tester',
          typeId:'3',
          id:'1',
          task:[{
            name:'Tidal Volume(Adult)',
            units:null,
            set:null,
            lowerLimit:null,
            upperLimit:null,
            task:[{
              number:0,
              name:'Adult',
              units:'mL',
              set:null,
              lowerLimit:0,
              upperLimit:2000,
              task:null
            },{
              number:1,
              name:'Infant',
              units:'mL',
              set:null,
              lowerLimit:0,
              upperLimit:350,
              task:null
            }]
          }]
        },{
          name:'Oxygen Analyzer',
          typeId:'4',
          id:'1',
          task:[{
              number:2,
              name:'Oxygen concentration',
              units:'%',
              set:20,
              lowerLimit:21,
              upperLimit:100,
              task:null
          }]
        }
      ],
      currentApparatus:1,
      TIdata:[
        {
          name: "Bellow Performance ",
          description: "Verify integrity"
        },
        {
          name: "Bellow Assembly Leak Test",
          description: "Verify operation"
        },
        {
          name: "Power ON self test",
          description: "Verify operation"
        },
        {
          name: "Pop-off valve performace",
          description: "Verify integrity"
        },
        {
          name: "Low O2 Supply Pressure Alarm test",
          description: "verify operation"
        },
        {
          name: "Low Airway Pressure Alarm test",
          description: "Verify operation"
        },
        {
          name: "Pressure Relief Valve test-verify operation",
          description: "Verify operation"
        },
        {
          name: "Controller Assembly Leak test",
          description: "Verif operation"
        },
        {
          name: "High Airway Pressure Switch test",
          description: "verify operation"
        },
      ],
      VIdata:[
        {
          name: "Chassis",
          description: "Verify physical integrity, cleanliness and condition"
        },
        {
          name: "Mount/Fasterners",
          description: "Verify physical integrity"
        },
        {
          name: "Fittings/Connectors",
          description: "Check all fittings/connectors"
        },
        {
          name: "Patient Circuit",
          description: "Verify physical integrity"
        },
        {
          name: "Indicator/Display",
          description: "Verify proper operation of controls"
        },
        {
          name: "Tubes/Hoses",
          description: "Verify integrity"
        },
        {
          name: "Alarms",
          description: "Check all alarms available"
        },
        {
          name: "Audible Signals",
          description: "Confirm appropiate volume and operation of volume controls"
        },
        {
          name: "Internal Hose",
          description: "Verify physical integrity"
        }
      ],
      PMTdata:[
        {
          name: "Clean/Inspect the Exterior & Interior",
        },
        {
          name: "Adjust Altitude Control & Interior",
        },
        {
          name: "Replace Battery",
        },
        {
          name: "Replace Bellows",
        },
      ],
      notes:null
    }
  }
  nextMain(){
    this.refs['pager'].setPage(this.state.main+1);
    this.setState({
      main:this.state.main+1,
    })
  }
  prevMain(){
    this.refs['pager'].setPage(this.state.main-1);
    this.setState({
      main:this.state.main-1,
    })
  }
  goToCM(){
    console.log('to CM');
  }
  changeCurrentPage(value,index){
    let newCurrentPage=this.state.currentPage;
    newCurrentPage[index]=value;
    this.setState({
      currentPage:newCurrentPage
    })
  }
  render(){
    let details=null
    let prePMForm=null
    let maintenance=null
    let review=null
    if(this.state.main==0){
      details=(
        <Details currentPage={this.state.currentPage[0]} maintenancer={this.state.maintenancer} assetDetails={this.state.assetDetails} changeCurrentPage={this.changeCurrentPage.bind(this)} nextMain={this.nextMain.bind(this)} prevMain={this.prevMain.bind(this)}/>
      )
    }else if(this.state.main==1){
      prePMForm=(
        <PrePMForm currentPage={this.state.currentPage[1]} changeCurrentPage={this.changeCurrentPage.bind(this)} nextMain={this.nextMain.bind(this)} prevMain={this.prevMain.bind(this)} sparePart={this.state.sparePart} apparatus={this.state.apparatus} setNewState={this.setState.bind(this)} />
      )
    }else if(this.state.main==2){
      maintenance=(
        <Maintenance notes={this.state.notes} sparePart={this.state.sparePart} goToCM={this.goToCM.bind(this)} currentApparatus={this.state.currentApparatus} apparatus={this.state.apparatus} PMTdata={this.state.PMTdata} precaution={this.state.precaution} VIdata={this.state.VIdata} TIdata={this.state.TIdata} apparatus={this.state.apparatus} currentPage={this.state.currentPage[2]} assetDetails={this.state.assetDetails} setNewState={this.setState.bind(this)} changeCurrentPage={this.changeCurrentPage.bind(this)} nextMain={this.nextMain.bind(this)} prevMain={this.prevMain.bind(this)}/>
      )
    }else{
      review=(
        <Review nextMain={this.nextMain.bind(this)} prevMain={this.prevMain.bind(this)} derivedState={this.state}/>
      )
    }
    return(
      <ViewPager
        initialPage={0}
        style={{flex:1}}
        horizontalScroll={false}
        ref="pager"
      >
        <View>
          {details}
        </View>
        <View>
          {prePMForm}
        </View>
        <View>
          {maintenance}
        </View>
        <View>
          {review}
        </View>
      </ViewPager>
    )
  }
}
