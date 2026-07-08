const BaseController=require("../core/BaseController")
const Symptom=require("../models/Symptoms")
const config=require("../config")

const symptomController = new BaseController(Symptom,{
    name:"Symptom",
    access:"user",
    accessKey:"userId",
    get:{
        pagination:config.pagination,
        searchFields:["mood"],
        populate:[{ path: "userId", select: "name email" }]
    }
})

const adminSymptomController = new BaseController(Symptom, {
    name:"Symptom",
    get:{
        pagination:config.pagination,
        searchFields:["mood"],
        populate:[{ path: "userId", select: "name email" }]
    }
})

module.exports={symptomController,adminSymptomController};