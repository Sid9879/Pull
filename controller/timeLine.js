const BaseController = require("../core/BaseController");
const TimeLine = require("../models/TimeLine");
const config = require("../config");

const timeLineController = new BaseController(TimeLine, {
    name: "TimeLine",
    access: "user",
    accessKey: "userId",
    get: {
        pagination: config.pagination,
        searchFields: ["notes"],
        populate: [{ path: "userId", select: "name email" }]
    }
});

module.exports = {timeLineController};
