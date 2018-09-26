import Realm from 'realm';
import {schema} from './Schema.js';

export function saveNotifData(state){
  return new Promise ((resolve,reject)=>{
    Realm.open({schema: schema,deleteRealmIfMigrationNeeded:true})
    .then(realm=>{
      let notifData = realm.objects('notificationDB')
      realm.write(()=>{
        let myData=realm.create('notificationDB',state)
      })
      resolve('done');
    })
    .catch(error => {
      reject(error)
    })
  })
}

export function getAllNotifData(){
  let data=new Realm({schema:deleteRealmIfMigrationNeeded:true}).objects('notificationDB')
  return data
}

export function getNotifDataByLocalId(id){
  let data=new Realm({schema:deleteRealmIfMigrationNeeded:true}).objects('notificationDB').filtered('notificationId='+id)
  return data[0]
}

export function getNotifDataByServerId(id){
  let data=new Realm({schema:deleteRealmIfMigrationNeeded:true}).objects('notificationDB').filtered('id='+id)
  return data[0]
}

export function localNotifDelete(id){
  Realm.open({schema: schema,deleteRealmIfMigrationNeeded:true})
  .then(realm=>{
    let data=realm.objects('notificationDB').filtered('notificationId='+id);
    realm.write(()=>{
      realm.delete(data)
    })
  })
  .catch(error=>{
    console.log(error)
  })
}
