import Realm from 'realm';
import {schema} from './Schema.js';


export function saveWOData(state){
  for(let i=1;i<state.apparatus.length;i++){
    state.apparatus[i].task=JSON.stringify(state.apparatus[i].task)
  }
  state.done=false
  return new Promise ((resolve,reject)=>{
    Realm.open({schema: schema,deleteRealmIfMigrationNeeded:true})
    .then(realm=>{
      let maintenanceData =realm.objects('workOrderDB');
      realm.write(()=>{
        let myData= realm.create('workOrderDB',state);
      })
      resolve('done');
    })
    .catch(error =>{
      console.log(error)
      reject(error)
    })
  })
}

export function getWODataByLocalId(id){
  let used=null
  let data=new Realm({schema: schema,deleteRealmIfMigrationNeeded:true}).objects('workOrderDB').filtered('workOrderId='+id)
  if(data[0]!=undefined){
    used = {
      workOrderId:data[0].workOrderId,
      id:data[0].id,
      WONo:data[0].WONo,
      WODate:data[0].WODate,
      assetNo:data[0].assetNo,
      desc:data[0].desc,
      hospital_id:data[0].hospital_id,
      location:data[0].location,
      requestForm:data[0].requestForm,
      WOReceipt:data[0].WOReceipt,
      assesmentDetails:data[0].assesmentDetails,
      sparePart:data[0].sparePart,
      completion:data[0].completion
    }
  }
  return used
}

export function getWODataByServerId(id){
  let used=null
  let data=new Realm({schema: schema,deleteRealmIfMigrationNeeded:true}).objects('workOrderDB').filtered('id='+id)
  if(data[0]!=undefined){
    used = {
      workOrderId:data[0].workOrderId,
      id:data[0].id,
      WONo:data[0].WONo,
      WODate:data[0].WODate,
      assetNo:data[0].assetNo,
      desc:data[0].desc,
      hospital_id:data[0].hospital_id,
      location:data[0].location,
      requestForm:data[0].requestForm,
      WOReceipt:data[0].WOReceipt,
      assesmentDetails:data[0].assesmentDetails,
      sparePart:data[0].sparePart,
      completion:data[0].completion
    }
  }
  return used
}

export function getWODataByFilter(filter){
  let used=null
  let returned=[]
  let data=new Realm({schema: schema,deleteRealmIfMigrationNeeded:true}).objects('workOrderDB').filtered('id='+id)
  if(data[0]!=undefined){
    data.forEach((object)=>{
      let apparatus=[]
      used = {
        workOrderId:object.workOrderId,
        id:object.id,
        WONo:object.WONo,
        WODate:object.WODate,
        assetNo:object.assetNo,
        desc:object.desc,
        hospital_id:object.hospital_id,
        location:object.location,
        requestForm:object.requestForm,
        WOReceipt:object.WOReceipt,
        assesmentDetails:object.assesmentDetails,
        sparePart:object.sparePart,
        completion:object.completion
      }
      returned.push(used)
    })
  }
  return returned
}


export function localWODelete(id){
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
