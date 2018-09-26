import React, {Component} from 'react';
import {View} from 'react-native';
import {ViewPager} from 'rn-viewpager';
import Details from './PPMComponent/Details.js';
import PrePMForm from './PPMComponent/PrePMForm.js';
import Main from './PPMComponent/Main.js';
import Action from './PPMComponent/Action.js'
import Review from './PPMComponent/Review.js';
import {login, loginVerify,test,logout} from './../API/APILogin.js';
import Cookie from 'react-native-cookie';
import {mainIP} from './../API/MainConfig.js';
import {getMaintenanceData,saveMaintenanceData,localDelete,closeDBMaintenance} from './../RealmDB/DBMaintenance.js'

export default class PPM extends Component{
  constructor(props){
    super(props)
    localDelete()
    let maintenanceData=getMaintenanceData(this.props.maintenanceId)
    console.log(maintenanceData)
    if(maintenanceData!=undefined && maintenanceData!=null){
      this.state={
        maintenanceId:JSON.parse(JSON.stringify(maintenanceData.maintenanceId)),
        type:JSON.parse(JSON.stringify(maintenanceData.type)),
        id:JSON.parse(JSON.stringify(maintenanceData.id)),
        maintenancer:JSON.parse(JSON.stringify(maintenanceData.maintenancer)),
        assetDetails:JSON.parse(JSON.stringify(maintenanceData.assetDetails)),
        cmDetails:Object.values(JSON.parse(JSON.stringify(maintenanceData.cmDetails))),
        main:JSON.parse(JSON.stringify(maintenanceData.main)),
        currentPage:Object.values(JSON.parse(JSON.stringify(maintenanceData.currentPage))),
        precaution:Object.values(JSON.parse(JSON.stringify(maintenanceData.precaution))),
        sparePart:Object.values(JSON.parse(JSON.stringify(maintenanceData.sparePart))),
        apparatus:Object.values(JSON.parse(JSON.stringify(maintenanceData.apparatus))),
        currentApparatus:JSON.parse(JSON.stringify(maintenanceData.currentApparatus)),
        TIdata:Object.values(JSON.parse(JSON.stringify(maintenanceData.TIdata))),
        VIdata:Object.values(JSON.parse(JSON.stringify(maintenanceData.VIdata))),
        PMTdata:Object.values(JSON.parse(JSON.stringify(maintenanceData.PMTdata))),
        notes:JSON.parse(JSON.stringify(maintenanceData.notes)),
        done:JSON.parse(JSON.stringify(maintenanceData.done)),
        prevMaintenanceId:JSON.parse(JSON.stringify(maintenanceData.prevMaintenanceId)),
        nextMaintenanceId:JSON.parse(JSON.stringify(maintenanceData.nextMaintenanceId))
      }
    }else{
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
          Model:'Puritan Bennet-840',
          AssetNo:'111010010110',
          Hours:'1.50',
        },
        cmDetails:{
          Name:'Dr. OZ',
          Desc:"Can't turn on the asset, i think the power cable broke",
          SparePart:[
            {
              name:'Power cable',
              qty:'1'
            }
          ]
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
            typeId:'040A0E02844985',
          },{
            name:'Bellows',
            typeId:'1111',
          }
        ],
        apparatus:[
          {
            name:'Electrical Safety Analyzer',
            id:'1',
            desc:'',
            qrcode:'5',
            threshold: 10,
            calibration_due_on:new Date()
          },{
            name:'Ventilator Tester',
            qrcode:'3',
            desc:'',
            calibration_due_on:new Date(),
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
            qrcode:'4',
            desc:'',
            calibration_due_on:new Date(),
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
        actionList:[],
        notes:''
      }
    }
  }
  saveCurrentMaintenanceData(){
    // console.log('this')
    let saved=saveMaintenanceData(JSON.parse(JSON.stringify(this.state)))
  }
  nextMain(){
    if(this.state.main==4){
      window.alert('Submitted!')
      this.props.backHandler()
    }
    if(this.state.main==1){
      if(this.props.cm==true){
        this.refs['pager'].setPage(this.state.main+1);
      }else{
        this.refs['pager'].setPage(this.state.main+2);
      }
    }else{
      this.refs['pager'].setPage(this.state.main+1);
    }
    this.setState({
      main:this.state.main+1,
    })
  }
  prevMain(){
    this.refs['pager'].setPage(this.state.main-1);
    if(this.state.main==3){
      if(this.props.cm==true){
        this.refs['pager'].setPage(this.state.main-1);
      }else{
        this.refs['pager'].setPage(this.state.main-2);
      }
    }else{
      this.refs['pager'].setPage(this.state.main- 1);
    }
    this.setState({
      main:this.state.main-1,
    })
  }
  goToCM(){
    this.props.changeStepMaintenance(1);
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
    // login('engineer','admin')
    // console.log(this.state)
    let details=null
    let prePMForm=null
    let maintenance=null
    let review=null
    let cmDetails=null
    let action=null
    if(this.props.cm){
      cmDetails=this.state.cmDetails
      if(this.state.main==0){
        details=(
          <Details cm={this.props.cm} saveCurrentMaintenanceData={this.saveCurrentMaintenanceData.bind(this)} cmDetails={cmDetails} currentPage={this.state.currentPage[0]} maintenancer={this.state.maintenancer} assetDetails={this.state.assetDetails} changeCurrentPage={this.changeCurrentPage.bind(this)} nextMain={this.nextMain.bind(this)} prevMain={this.prevMain.bind(this)}/>
        )
      }else if(this.state.main==1){
        prePMForm=(
          <PrePMForm cm={this.props.cm} saveCurrentMaintenanceData={this.saveCurrentMaintenanceData.bind(this)} currentPage={this.state.currentPage[1]} changeCurrentPage={this.changeCurrentPage.bind(this)} nextMain={this.nextMain.bind(this)} prevMain={this.prevMain.bind(this)} sparePart={this.state.sparePart} apparatus={this.state.apparatus} setNewState={this.setState.bind(this)} />
        )
      }else if (this.state.main==2){
        action=(
          <View>
            <Action actionList nextMain={this.nextMain.bind(this)} prevMain={this.prevMain.bind(this)} setNewState={this.setState.bind(this)}/>
          </View>
        )
      }else if(this.state.main==3){
        maintenance=(
          <Main cm={this.props.cm} saveCurrentMaintenanceData={this.saveCurrentMaintenanceData.bind(this)} notes={this.state.notes} sparePart={this.state.sparePart} goToCM={this.goToCM.bind(this)} currentApparatus={this.state.currentApparatus} apparatus={this.state.apparatus} PMTdata={this.state.PMTdata} precaution={this.state.precaution} VIdata={this.state.VIdata} TIdata={this.state.TIdata} apparatus={this.state.apparatus} currentPage={this.state.currentPage[2]} assetDetails={this.state.assetDetails} setNewState={this.setState.bind(this)} changeCurrentPage={this.changeCurrentPage.bind(this)} nextMain={this.nextMain.bind(this)} prevMain={this.prevMain.bind(this)}/>
        )
      }else{
        review=(
          <Review cm={this.props.cm} saveCurrentMaintenanceData={this.saveCurrentMaintenanceData.bind(this)} nextMain={this.nextMain.bind(this)} prevMain={this.prevMain.bind(this)} derivedState={this.state}/>
        )
      }
    }else{
      if(this.state.main==0){
        details=(
          <Details cm={this.props.cm} saveCurrentMaintenanceData={this.saveCurrentMaintenanceData.bind(this)} cmDetails={cmDetails} currentPage={this.state.currentPage[0]} maintenancer={this.state.maintenancer} assetDetails={this.state.assetDetails} changeCurrentPage={this.changeCurrentPage.bind(this)} nextMain={this.nextMain.bind(this)} prevMain={this.prevMain.bind(this)}/>
        )
      }else if(this.state.main==1){
        prePMForm=(
          <PrePMForm cm={this.props.cm} saveCurrentMaintenanceData={this.saveCurrentMaintenanceData.bind(this)} currentPage={this.state.currentPage[1]} changeCurrentPage={this.changeCurrentPage.bind(this)} nextMain={this.nextMain.bind(this)} prevMain={this.prevMain.bind(this)} sparePart={this.state.sparePart} apparatus={this.state.apparatus} setNewState={this.setState.bind(this)} />
        )
      }if(this.state.main==2){
        maintenance=(
          <Maincm={this.props.cm} saveCurrentMaintenanceData={this.saveCurrentMaintenanceData.bind(this)} notes={this.state.notes} sparePart={this.state.sparePart} goToCM={this.goToCM.bind(this)} currentApparatus={this.state.currentApparatus} apparatus={this.state.apparatus} PMTdata={this.state.PMTdata} precaution={this.state.precaution} VIdata={this.state.VIdata} TIdata={this.state.TIdata} apparatus={this.state.apparatus} currentPage={this.state.currentPage[2]} assetDetails={this.state.assetDetails} setNewState={this.setState.bind(this)} changeCurrentPage={this.changeCurrentPage.bind(this)} nextMain={this.nextMain.bind(this)} prevMain={this.prevMain.bind(this)}/>
        )
      }else{
        review=(
          <Review cm={this.props.cm} saveCurrentMaintenanceData={this.saveCurrentMaintenanceData.bind(this)} nextMain={this.nextMain.bind(this)} prevMain={this.prevMain.bind(this)} derivedState={this.state}/>
        )
      }
    }

    return(
      <ViewPager
        initialPage={this.state.main}
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
        {action}
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
