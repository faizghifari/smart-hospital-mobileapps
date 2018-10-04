
/////////////////////////////////////////////////
////////// DB LOGIN //////////////////////////

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
////////// DB EQUIPMENT ///////////////////////


const equipmentDetail = {
  name: 'equipment',
  primaryKey:'equipmentId',
  properties:{
    equipmentId:'int',
    name:'string',
    desc:'string',
    hr_req:'string',
    time_params:'string',
    level:'int',
    apparatus_type_id:'int',
    spare_part_type_id:'int',
    qualitative_tasks:'string',
    preventive_tasks:'string',
    disposal_tasks:'string'
  }
}

/////////////////////////////////////////////////
////////// DB MAINTENANCE ///////////////////////
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

const sparePartCM={
  name:'sparePartCM',
  properties:{
    name:'string',
    qty:'int'
  }
}

const cmDetails={
  name:'cmDetails',
  properties:{
    Name:'string',
    Desc:'string',
    SparePart:{type:'list',objectType:'sparePartCM'}
  }
}

const maintenanceDB = {
  name: 'maintenanceDB',
  primaryKey:'maintenanceId',
  properties: {
    maintenanceId: 'int',
    type:'string',
    maintenancer:'maintenancer',
    assetDetails:'assetDetails',
    cmDetails:{type:'cmDetails',optional:true},
    main:'int',
    currentPage:'int?[]',
    precaution:'bool?[]',
    sparePart:{type:'list',objectType:'sparePart'},
    apparatus:{type:'list',objectType:'apparatus'},
    currentApparatus:'int',
    TIdata:{type:'list',objectType:'Idata'},
    VIdata:{type:'list',objectType:'Idata'},
    PMTdata:{type:'list',objectType:'PMTdata'},
    actionList:'string?[]',
    notes:'string',
    done:'bool',
    prevMaintenanceId:{type:'int',optional:true},
    nextMaintenanceId:{type:'int',optional:true}
  },
}
/////////////////////////////////////////////////
////////// DB NOTIFICATION //////////////////////

const notifDB={
  name:'notificationDB',
  primaryKey:'notificationId',
  properties:{
    notificationId:'int',
    name:'string',
    status:'string',
    image:'string',
    localstatus:'int',
    referenceId:'int'
  }
}

//////////////////////////////////////////////////
////////// DB HISTORY ///////////////////////

const historyDB={
  name:'historyDB',
  primaryKey:'historyId',
  properties:{
    historyId:'int',
    name:'string',
    status:'string',
    image:'string',
    date:'date',
    type:'string',
    referenceId:'int'
  }
}

//////////////////////////////////////////////////
////////// DB WorkOrder ///////////////////////

const requestForm={
  name:'requestForm',
  properties:{
    requestorId:'int',
    requestorName:'string',
    requestorPhone:'string',
    requestorDesignation:'string',
    requestorDate:'date',
  }
}

const WOReceipt={
  name:'WOReceipt',
  properties:{
    responderId:'int',
    date:'date',
    WOCat:'string',
    WOType:'string',
    WGCode:'string',
    targetDate:'date',
    priority:'string',
    estHrs:'string',
    parts:'bool',
    canceledBy:'string',
    reason:'string',
  }
}

const assesmentDetails={
  name:'assesmentDetails',
  properties:{
    respondedBy:'string',
    respondDate:'date',
    rootCause:'string',
  }
}

const completion={
  name:'completion',
  properties:{
    action:'string?[]',
    QCUptime:'int',
    QCPPM:'string',
    handoverDate:'date',
    acceptedBy:'string',
  }
}

const workOrderDB={
  name:'workOrderDB',
  primaryKey:'workOrderId',
  properties:{
    workOrderId:'int',
    WONo:'string',
    WODate:'date',
    assetNo:'string',
    desc:'string',
    hospital_id:'int',
    location:'string',
    requestForm:{type:'requestForm',optional:true},
    WOReceipt:{type:'WOReceipt',optional:true},
    assesmentDetails:{type:'assesmentDetails',optional:true},
    sparePart:{type:'list',objectType:'sparePartCM'},
    completion:{type:'completion',optional:true},
  }
}

export var schema=[CookiesToken,UserData,sparePart,apparatus,Idata,PMTdata,maintenancer,assetDetails,sparePartCM,cmDetails,maintenanceDB,notifDB,historyDB,requestForm,WOReceipt,assesmentDetails,completion,workOrderDB];
