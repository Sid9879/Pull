const MentalHealth = require("../models/MentalHealth");
const BaseController = require("../core/BaseController");
const config = require("../config");

const mentalHealthController = new BaseController(MentalHealth, {
    name: "MentalHealth",
    access: "user",
    accessKey: "userId",
    get: {
        pagination: config.pagination,
        searchFields: ["mood"],
        populate: [{ path: "userId", select: "name email" }]
    }
});

const adminMentalHealthController = new BaseController(MentalHealth, {
    name: "MentalHealth",
    get: {
        pagination: config.pagination,
        searchFields: ["mood"],
        populate: [{ path: "userId", select: "name email" }]
    }
});

module.exports = {mentalHealthController,adminMentalHealthController};