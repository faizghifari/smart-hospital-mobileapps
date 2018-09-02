import Realm from 'realm';
import {schema} from './Schema.js';


export function saveMaintenanceData(state){
  for(let i=1;i<state.apparatus.length;i++){
    console.log(state.apparatus[i].task)
    state.apparatus[i].task=JSON.stringify(state.apparatus[i].task)
  }
  state.done=false
  console.log(state)
  return new Promise ((resolve,reject)=>{
    Realm.open({schema: schema,deleteRealmIfMigrationNeeded:true})
    .then(realm=>{
      let maintenanceData =realm.objects('maintenanceDB');
      console.log('panjang',maintenanceData.length)
      if(maintenanceData.length == 0){
        realm.write(()=>{
          let myData= realm.create('maintenanceDB',state);
        })
        resolve('berhasil');
      }else{
        realm.write(()=>{
          realm.delete(maintenanceData);
        });
        realm.write(()=>{
          let myData = realm.create('maintenanceDB',state);
        })
        resolve('loaded');
      }
    })
    .catch(error =>{
      console.log(error)
      reject(error)
    })
  })
}

export function getMaintenanceData(){
  let used=null
  let data=new Realm({schema: schema,deleteRealmIfMigrationNeeded:true}).objects('maintenanceDB')
  console.log(data.length)
  if(data[0]!=undefined){
    let apparatus=[]
    for(key in data[0].apparatus){
      console.log(JSON.parse(JSON.stringify(data[0].apparatus[key])))
      apparatus.push(JSON.parse(JSON.stringify(data[0].apparatus[key])))
    }
    used = {
      maintenancer:data[0].maintenancer,
      assetDetails:data[0].assetDetails,
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
      done:data[0].done
    }
    for(let i=1;i<used.apparatus.length;i++){
      used.apparatus[i].task=(JSON.parse(used.apparatus[i].task))
    }
    console.log(used)
  }
  return used
}

export function localDelete(){
  Realm.open({schema: schema,deleteRealmIfMigrationNeeded:true})
  .then(realm=>{
    let data=realm.objects('maintenanceDB');
    realm.write(()=>{
      realm.delete(data)
    })
  })
  .catch(error=>{
    console.log(error)
  })
}
