
/////////////////////////////////////////////////
////////// DB LOGIN ///////////////////////

const CookiesToken = {
  name: 'CookiesToken',
  properties: {
    JWTtoken:'string',
    createdDate:'date',
    expireInMinutes:'int'
  },
}

const UserData = {
  name: 'UserData',
  properties:{
    id:'int',
    username:'string',
    email:'string',
    hospital_id:'int',
    role_id:'int'
  }
}
/////////////////////////////////////////////////
////////// DB MAINTENACE ///////////////////////
const sparePart={
  name: 'sparePart',
  properties:{
    name:'string',
    typeId:'string',
    id:{type:'int',optional:true},
    checked:{type:'bool',optional:true}
  }
}

// const task={
//   name:'task',
//   properties:{
//     number:'int',
//     name:'string',
//     units:'string',
//     set:'string',
//     lowerLimit:'int',
//     upperLimit:'int',
//     task:{type:'list',objectType:'task',optional:true},
//     value:{type:'int',optional:true}
//   }
// }

const apparatus={
  name:'apparatus',
  properties:{
    name:'string',
    desc:'string',
    qrcode:'string',
    threshold:{type:'int',optional:true},
    calibration_due_on:'date',
    task:{type:'string',optional:true},
    checked:{type:'bool',optional:true},
    value:{type:'string',optional:true}
  }
}

const Idata={
  name:'Idata',
  properties:{
    name:'string',
    description:'string',
    value:{type:'string',optional:true}
  }
}

const PMTdata={
  name:'PMTdata',
  properties:{
    name:'string',
    value:{type:'string',optional:true}
  }
}

const maintenancer={
  name:'maintenancer',
  properties:{
    ID:'string',
    Name:'string',
    Email:'string',
    Phone:'string'
  }
}

const assetDetails={
  name:'assetDetails',
  properties:{
    No:'string',
    Name:'string',
    Manufacturer:'string',
    Frequency:'string',
    AssetNo:'string',
    Model:'string',
    Hours:'string',
    founded:{type:'bool',optional:true}
  }
}

const maintenanceDB = {
  name: 'maintenanceDB',
  properties: {
    maintenancer:'maintenancer',
    assetDetails:'assetDetails',
    main:'int',
    currentPage:'int?[]',
    precaution:'bool?[]',
    sparePart:{type:'list',objectType:'sparePart'},
    apparatus:{type:'list',objectType:'apparatus'},
    currentApparatus:'int',
    TIdata:{type:'list',objectType:'Idata'},
    VIdata:{type:'list',objectType:'Idata'},
    PMTdata:{type:'list',objectType:'PMTdata'},
    notes:'string',
    done:'bool'
  },
}
/////////////////////////////////////////////////////////

export var schema=[maintenanceDB,PMTdata,Idata,apparatus,sparePart,maintenancer,assetDetails,CookiesToken,UserData];
