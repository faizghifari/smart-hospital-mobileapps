import {mainIP} from './MainConfig.js';

export function login(username,password){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    var urls = 'http://'+mainIP+'/login/verify';
    var params='username='+username+'&password='+password
    xhr.open('POST',urls);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    setTimeout(()=>{
      if(xhr.readyState<3){
        reject('!!error');
      }
    },2000)
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

export function loginVerify(username,pin){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    let urls = 'http://'+mainIP+'/login';
    let params="username="+username+"&pin="+pin
    xhr.open('POST',urls);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    setTimeout(()=>{
      if(xhr.readyState<3){
        reject('!!error');
      }
    },2000)
    console.log('jalan')
    xhr.onreadystatechange = (e) => {
      if(xhr.readyState===4){
        if(xhr.status===200){
          if(xhr.responseText=='Incorrect PIN!'){
            console.log('1')
            reject(xhr.responseText);
          }else{
            console.log(xhr.responseText)
            resolve(xhr.responseText);
          }
        }else{
          console.log(xhr.status)
          reject('error');
        }
      }
    }
    xhr.send(params);
  })
};

export function logout(username,pin){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    let urls = 'http://'+mainIP+'/logout';
    xhr.open('GET',urls);
    setTimeout(()=>{
      if(xhr.readyState<3){
        reject('!!error');
      }
    },2000)
    xhr.onreadystatechange = (e) => {
      if(xhr.readyState===4){
        if(xhr.status===200){
          resolve(xhr.responseText);
        }else{
          reject('error');
        }
      }
    }
    xhr.send();
  })
};

export function test(username,pin){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    let urls = 'http://'+mainIP+'/api/equipment';
    xhr.open('GET',urls);
    setTimeout(()=>{
      if(xhr.readyState<3){
        reject('!!error');
      }
    },2000)
    xhr.onreadystatechange = (e) => {
      if(xhr.readyState===4){
        console.log(xhr.status)
        if(xhr.status===200){
          resolve(xhr.responseText);
        }else{
          reject('error');
        }
      }
    }
    xhr.send();
  })
};
