export function Seed(){
  const maintenance=[
    {
      maintenancer:{
        ID:'10000',
        Name:'Rezky Alamsyah',
        Email:'rezkyal2@gmail.com',
        Phone:'+6285718246369'
      },
      assetDetails:{
        No:'111',
        Name:'Ventilators',
        Manufacturer:'Puritan Bennet',
        Frequency:'12 Monthly',
        Model:'Puritan Bennet-840',
        AssetNo:'111010010110',
        Hours:'1.50',
      },
      cmDetails:{
        Name:'Dr. OZ',
        Desc:"Can't turn on the asset, i think the power cable broke",
        SparePart:[
          {
            name:'Power cable',
            qty:'1'
          }
        ]
      },
      main:0,
      currentPage:[
        0,
        0,
        0,
      ],
      precaution:[
        false,false,false
      ],
      sparePart:[
        {
          name:'Battery',
          typeId:'040A0E02844985',
        },{
          name:'Bellows',
          typeId:'1111',
        }
      ],
      apparatus:[
        {
          name:'Electrical Safety Analyzer',
          id:'1',
          desc:'',
          qrcode:'5',
          threshold: 10,
          calibration_due_on:new Date()
        },{
          name:'Ventilator Tester',
          qrcode:'3',
          desc:'',
          calibration_due_on:new Date(),
          task:[{
            name:'Tidal Volume(Adult)',
            units:null,
            set:null,
            lowerLimit:null,
            upperLimit:null,
            task:[{
              number:0,
              name:'Adult',
              units:'mL',
              set:null,
              lowerLimit:0,
              upperLimit:2000,
              task:null
            },{
              number:1,
              name:'Infant',
              units:'mL',
              set:null,
              lowerLimit:0,
              upperLimit:350,
              task:null
            }]
          }]
        },{
          name:'Oxygen Analyzer',
          qrcode:'4',
          desc:'',
          calibration_due_on:new Date(),
          task:[{
              number:2,
              name:'Oxygen concentration',
              units:'%',
              set:20,
              lowerLimit:21,
              upperLimit:100,
              task:null
          }]
        }
      ],
      currentApparatus:1,
      TIdata:[
        {
          name: "Bellow Performance ",
          description: "Verify integrity"
        },
        {
          name: "Bellow Assembly Leak Test",
          description: "Verify operation"
        },
        {
          name: "Power ON self test",
          description: "Verify operation"
        },
        {
          name: "Pop-off valve performace",
          description: "Verify integrity"
        },
        {
          name: "Low O2 Supply Pressure Alarm test",
          description: "verify operation"
        },
        {
          name: "Low Airway Pressure Alarm test",
          description: "Verify operation"
        },
        {
          name: "Pressure Relief Valve test-verify operation",
          description: "Verify operation"
        },
        {
          name: "Controller Assembly Leak test",
          description: "Verif operation"
        },
        {
          name: "High Airway Pressure Switch test",
          description: "verify operation"
        },
      ],
      VIdata:[
        {
          name: "Chassis",
          description: "Verify physical integrity, cleanliness and condition"
        },
        {
          name: "Mount/Fasterners",
          description: "Verify physical integrity"
        },
        {
          name: "Fittings/Connectors",
          description: "Check all fittings/connectors"
        },
        {
          name: "Patient Circuit",
          description: "Verify physical integrity"
        },
        {
          name: "Indicator/Display",
          description: "Verify proper operation of controls"
        },
        {
          name: "Tubes/Hoses",
          description: "Verify integrity"
        },
        {
          name: "Alarms",
          description: "Check all alarms available"
        },
        {
          name: "Audible Signals",
          description: "Confirm appropiate volume and operation of volume controls"
        },
        {
          name: "Internal Hose",
          description: "Verify physical integrity"
        }
      ],
      PMTdata:[
        {
          name: "Clean/Inspect the Exterior & Interior",
        },
        {
          name: "Adjust Altitude Control & Interior",
        },
        {
          name: "Replace Battery",
        },
        {
          name: "Replace Bellows",
        },
      ],
      actionList:[],
      notes:''
    },
  ]
}

export function SeedEquipment(){
  const equipment=[
    {
      equipmentId:1,
      name:'Syringe pump',
      desc:'Pump for syringe',
      hr_req:'',
      time_params:'',
      level:0,
      apparatus_type_id:0,
      spare_part_type_id:0,
      qualitative_tasks:'',
      preventive_tasks:'bbb',

    }
  ]
}
