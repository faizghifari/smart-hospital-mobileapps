import {mainIP,globalTimeout} from './MainConfig.js';

/* PPM */

export function getPPMList(){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    var urls = 'http://'+mainIP+'/maintenance/ppm';
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
          resolve(xhr.responseText);
        }else if(xhr.status===400){
          reject(xhr.responseText);
        }else{
          reject('error');
        }
      }
    }
    xhr.send(params);
  })
};

export function getPPMOpenList(){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    var urls = 'http://'+mainIP+'/maintenance/ppm/open';
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

          resolve(xhr.responseText);
        }else if(xhr.status===400){


          reject(xhr.responseText);
        }else{
          reject('error');
        }
      }
    }
    xhr.send(params);
  })
};

export function getPPMClosedList(){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    var urls = 'http://'+mainIP+'/maintenance/ppm/closed';
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

          resolve(xhr.responseText);
        }else if(xhr.status===400){


          reject(xhr.responseText);
        }else{
          reject('error');
        }
      }
    }
    xhr.send(params);
  })
};

/* CM */
export function getCMList(){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    var urls = 'http://'+mainIP+'/maintenance/cm';
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

          resolve(xhr.responseText);
        }else if(xhr.status===400){


          reject(xhr.responseText);
        }else{
          reject('error');
        }
      }
    }
    xhr.send(params);
  })
};

export function getCMOpenList(){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    var urls = 'http://'+mainIP+'/maintenance/cm/open';
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

          resolve(xhr.responseText);
        }else if(xhr.status===400){


          reject(xhr.responseText);
        }else{
          reject('error');
        }
      }
    }
    xhr.send(params);
  })
};

export function getCMClosedList(){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    var urls = 'http://'+mainIP+'/maintenance/cm/closed';
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

          resolve(xhr.responseText);
        }else if(xhr.status===400){


          reject(xhr.responseText);
        }else{
          reject('error');
        }
      }
    }
    xhr.send(params);
  })
};

export function getCMBERList(){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    var urls = 'http://'+mainIP+'/maintenance/cm/ber';
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

          resolve(xhr.responseText);
        }else if(xhr.status===400){


          reject(xhr.responseText);
        }else{
          reject('error');
        }
      }
    }
    xhr.send(params);
  })
};

export function getCMNotBERList(){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    var urls = 'http://'+mainIP+'/maintenance/cm/not_ber';
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

          resolve(xhr.responseText);
        }else if(xhr.status===400){


          reject(xhr.responseText);
        }else{
          reject('error');
        }
      }
    }
    xhr.send(params);
  })
};

/* Work Order */

export function getWOList(){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    var urls = 'http://'+mainIP+'/maintenance/work_order';
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
          resolve(xhr.responseText);
        }else if(xhr.status===400){
          reject(xhr.responseText);
        }else{
          reject('error');
        }
      }
    }
    xhr.send(params);
  })
};

export function getWOOpenList(){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    var urls = 'http://'+mainIP+'/maintenance/work_order/open';
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
          resolve(xhr.responseText);
        }else if(xhr.status===400){
          reject(xhr.responseText);
        }else{
          reject('error');
        }
      }
    }
    xhr.send(params);
  })
};

export function getWOClosedList(){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    var urls = 'http://'+mainIP+'/maintenance/work_order/closed';
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
          resolve(xhr.responseText);
        }else if(xhr.status===400){
          reject(xhr.responseText);
        }else{
          reject('error');
        }
      }
    }
    xhr.send(params);
  })
};
