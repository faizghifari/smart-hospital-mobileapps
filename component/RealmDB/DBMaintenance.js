import Realm from 'realm';
import {schema} from './Schema.js';


export function saveMaintenanceData(state){
  for(let i=1;i<state.apparatus.length;i++){
    state.apparatus[i].task=JSON.stringify(state.apparatus[i].task)
  }
  state.done=false
  return new Promise ((resolve,reject)=>{
    Realm.open({schema: schema,deleteRealmIfMigrationNeeded:true})
    .then(realm=>{
      let maintenanceData =realm.objects('maintenanceDB');
      realm.write(()=>{
        let myData= realm.create('maintenanceDB',state,true);
      })
      resolve('done');
    })
    .catch(error =>{
      console.log(error)
      reject(error)
    })
  })
}

export function getMaintenanceDataByLocalId(id){
  let used=null
  let data=new Realm({schema: schema,deleteRealmIfMigrationNeeded:true}).objects('maintenanceDB').filtered('maintenanceId='+id)
  if(data[0]!=undefined){
    let apparatus=[]
    for(key in data[0].apparatus){
      apparatus.push(JSON.parse(JSON.stringify(data[0].apparatus[key])))
    }
    used = {
      type:data[0].type,
      id:data[0].id,
      maintenancer:data[0].maintenancer,
      assetDetails:data[0].assetDetails,
      cmDetails:data[0].cmDetails,
      main:data[0].main,
      currentPage:data[0].currentPage,
      precaution:data[0].precaution,
      sparePart:data[0].sparePart,
      apparatus:apparatus,
      currentApparatus:data[0].currentApparatus,
      TIdata:data[0].TIdata,
      VIdata:data[0].VIdata,
      PMTdata:data[0].PMTdata,
      notes:data[0].notes,
      done:data[0].done,
      prevMaintenanceId:data[0].prevMaintenanceId,
      nextMaintenanceId:data[0].nextMaintenanceId,
    }
    for(let i=1;i<used.apparatus.length;i++){
      used.apparatus[i].task=(JSON.parse(used.apparatus[i].task))
    }
  }
  return used
}

export function getMaintenanceDataByServerId(id){
  let used=null
  let data=new Realm({schema: schema,deleteRealmIfMigrationNeeded:true}).objects('maintenanceDB').filtered('id='+id)
  if(data[0]!=undefined){
    let apparatus=[]
    for(key in data[0].apparatus){
      apparatus.push(JSON.parse(JSON.stringify(data[0].apparatus[key])))
    }
    used = {
      type:data[0].type,
      id:data[0].id,
      maintenancer:data[0].maintenancer,
      assetDetails:data[0].assetDetails,
      cmDetails:data[0].cmDetails,
      main:data[0].main,
      currentPage:data[0].currentPage,
      precaution:data[0].precaution,
      sparePart:data[0].sparePart,
      apparatus:apparatus,
      currentApparatus:data[0].currentApparatus,
      TIdata:data[0].TIdata,
      VIdata:data[0].VIdata,
      PMTdata:data[0].PMTdata,
      notes:data[0].notes,
      done:data[0].done,
      prevMaintenanceId:data[0].prevMaintenanceId,
      nextMaintenanceId:data[0].nextMaintenanceId,
    }
    for(let i=1;i<used.apparatus.length;i++){
      used.apparatus[i].task=(JSON.parse(used.apparatus[i].task))
    }
  }
  return used
}

export function getMaintenanceDataByFilter(filter){
  let used=null
  let returned=[]
  let data=new Realm({schema: schema,deleteRealmIfMigrationNeeded:true}).objects('maintenanceDB').filtered(filter)
  if(data[0]!=undefined){
    data.forEach((object)=>{
      let apparatus=[]
      for(key in object.apparatus){
        apparatus.push(JSON.parse(JSON.stringify(data[0].apparatus[key])))
      }
      used = {
        type:object.type,
        id:object.id,
        maintenancer:object.maintenancer,
        assetDetails:object.assetDetails,
        cmDetails:object.cmDetails,
        main:object.main,
        currentPage:object.currentPage,
        precaution:object.precaution,
        sparePart:object.sparePart,
        apparatus:apparatus,
        currentApparatus:object.currentApparatus,
        TIdata:object.TIdata,
        VIdata:object.VIdata,
        PMTdata:object.PMTdata,
        notes:object.notes,
        done:object.done,
        prevMaintenanceId:object.prevMaintenanceId,
        nextMaintenanceId:object.nextMaintenanceId,
      }
      for(let i=1;i<used.apparatus.length;i++){
        used.apparatus[i].task=(JSON.parse(used.apparatus[i].task))
      }
      returned.push(used)
    })
  }
  return returned
}


export function localMaintenanceDelete(id){
  Realm.open({schema: schema,deleteRealmIfMigrationNeeded:true})
  .then(realm=>{
    let data=realm.objects('maintenanceDB').filtered('maintenanceId='+id);
    realm.write(()=>{
      realm.delete(data)
    })
  })
  .catch(error=>{
    console.log(error)
  })
}
