const express = require('express');
const router = express.Router()
const { authController} = require('../controller/auth');
const {adminMedicinesController}=require("../controller/medicines");
const { adminMentalHealthController } = require('../controller/mentalHealth');
router.use(authController.authenticateToken);

//medicines routes
router.get('/medicines', adminMedicinesController.get);
router.get('/medicines/:id', adminMedicinesController.getById);


//mentalHealth routes
router.get("/mentalHealth",adminMentalHealthController.get)
router.get("/mentalHealth/:id",adminMentalHealthController.getById)


module.exports = router;