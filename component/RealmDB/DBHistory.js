import Realm from 'realm';
import {schema} from './Schema.js';

export function saveHistoryData(state){
  return new Promise ((resolve,reject)=>{
    Realm.open({schema: schema,deleteRealmIfMigrationNeeded:true})
    .then(realm=>{
      let notifData = realm.objects('historyDB')
      realm.write(()=>{
        let myData=realm.create('historyDB',state)
      })
      resolve('done');
    })
    .catch(error => {
      reject(error)
    })
  })
}

export function getAllNotifData(){
  let data=new Realm({schema:deleteRealmIfMigrationNeeded:true}).objects('historyDB')
  return data
}

export function getNotifDataByLocalId(id){
  let data=new Realm({schema:deleteRealmIfMigrationNeeded:true}).objects('historyDB').filtered('historyId='+id)
  return data[0]
}

export function getNotifDataByServerId(id){
  let data=new Realm({schema:deleteRealmIfMigrationNeeded:true}).objects('historyDB').filtered('id='+id)
  return data[0]
}

export function localNotifDelete(id){
  Realm.open({schema: schema,deleteRealmIfMigrationNeeded:true})
  .then(realm=>{
    let data=realm.objects('historyDB').filtered('historyId='+id);
    realm.write(()=>{
      realm.delete(data)
    })
  })
  .catch(error=>{
    console.log(error)
  })
}
