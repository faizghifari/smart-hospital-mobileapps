import Realm from 'realm';
import {schema} from './Schema.js';

export function deleteAll(){
  Realm.open({schema: [CookiesToken,UserData]})
  .then(realm=>{
    realm.write(()=>{
      realm.deleteAll()
    })
  })
}

export function saveCookiesData(token,createdDate,expireInMinutes){
  return new Promise ((resolve,reject)=>{
    let savedCookies={
      JWTtoken:token,
      createdDate:createdDate,
      expireInMinutes:expireInMinutes
    }
    Realm.open({schema:schema ,deleteRealmIfMigrationNeeded:true})
    .then(realm=>{
      let cookiesData =realm.objects('CookiesToken');
      if(cookiesData.length == 0){
        realm.write(()=>{
          let myCookies= realm.create('CookiesToken',savedCookies);
        })
        resolve(data);
      }else{
        realm.write(()=>{
          realm.delete(cookiesData);
        });
        realm.write(()=>{
          let myCookies = realm.create('CookiesToken',savedCookies);
        })
        resolve(data);
      }
    })
    .catch(error =>{
      console.log(error)
      reject(error)
    })
  })
}

export function getCookiesData(){
  let data=new Realm({schema: schema,deleteRealmIfMigrationNeeded:true}).objects('CookiesToken')
  return data[0]
}

export function saveUserData(data){
  return new Promise ((resolve,reject)=>{
    let savedData={
      id:data.user.id,
      username:data.user.username,
      email:data.user.email,
      hospital_id:data.user.hospital_id,
      role_id:data.user.role_id
    }
    let myData=null
    Realm.open({schema: schema,deleteRealmIfMigrationNeeded:true})
    .then(realm=>{
      let userData= realm.objects('UserData');
      if(userData.length == 0){
        realm.write(()=>{
          myData=realm.create('UserData',savedData)
        })
      }else{
        realm.write(()=>{
          realm.delete(userData);
        });
        realm.write(()=>{
          myData=realm.create('UserData',savedData)
        })
      }
      resolve(savedData)
    })
    .catch(error =>{
      console.log(error)
      reject(error)
    })
  })
}

export function getUserData(){
  return new Promise ((resolve,reject)=>{
    Realm.open({schema: schema,deleteRealmIfMigrationNeeded:true})
    .then(realm=>{
      let userData=realm.objects('UserData');
      resolve(userData[0])
    })
    .catch(error=>{
      reject(error)
      console.log(error)
    })
  })
}

export function localLogout(){
  Realm.open({schema: schema,deleteRealmIfMigrationNeeded:true})
  .then(realm=>{
    let cookiesData=realm.objects('CookiesToken');
    let userData=realm.objects('UserData');
    realm.write(()=>{
      realm.delete(cookiesData)
    })
    realm.write(()=>{
      realm.delete(userData)
    })
  })
  .catch(error=>{
    console.log(error)
  })
}
