import {mainIP,globalTimeout} from './MainConfig.js';

export function getIdFromSN(hospital_id,device_sn){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    var urls = 'http://'+mainIP+'/'+hospital_id+'/device/'+device_sn;
    xhr.open('GET',urls);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    setTimeout(()=>{
      if(xhr.readyState<3){
        reject('!!error');
      }
    },globalTimeout)
    xhr.onreadystatechange = (e) => {
      if(xhr.readyState===4){
        if(xhr.status===200){
          console.log('test',xhr.responseText);
          resolve(xhr.responseText);
        }else if(xhr.status===400){
          console.log(mainIP)
          console.log(xhr.status)
          reject(xhr.responseText);
        }else{
          reject('error');
        }
      }
    }
    xhr.send(params);
  })
};
