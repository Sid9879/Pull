const express = require('express');
const router = express.Router();
const water = require('../controller/water');
const appointments = require('../controller/appointments');
const exercises = require('../controller/exercises');
const { authController} = require('../controller/auth');
const { MedicinesController } = require('../controller/medicines');
const { mentalHealthController } = require('../controller/mentalHealth');
const { symptomController } = require('../controller/symptoms');
const { timeLineController } = require('../controller/timeLine');
const { dashboardController, checklistDashboardController } = require('../controller/dashboard');
const {
  bulkInsertDiseases,
  getAllDiseases,
  searchDiseases,
  getDiseaseDetails
} = require("../controller/Disease");

router.use(authController.authenticateToken);

// Dashboard Route
router.get('/dashboard', dashboardController);
router.get('/dashboard/checklist', checklistDashboardController);


// Water routes
router.get('/water', water.getTodayWater);
router.post('/water', water.addWater);
// router.delete('/water/:id', water.deleteById);

// Appointments routes
router.get('/appointments', appointments.get);
router.get('/appointments/:id', appointments.getById);
router.post('/appointments', appointments.create);
router.put('/appointments/:id', appointments.updateAppointment);
router.delete('/appointments/:id', appointments.deleteById);

// Exercises routes
router.get('/exercises', exercises.getExercises);
router.post('/exercises', exercises.createExercise);

//medicines route 
router.post("/medicines",MedicinesController.create)
router.get("/medicines",MedicinesController.get)
router.get("/medicines/:id",MedicinesController.getById)
router.put("/medicines/:id",MedicinesController.updateMedicines)
router.delete("/medicines/:id",MedicinesController.deleteById)

//mentalHealth routes
router.post("/mentalHealth",mentalHealthController.create)
router.get("/mentalHealth",mentalHealthController.get)
router.get("/mentalHealth/:id",mentalHealthController.getById)
router.put("/mentalHealth/:id",mentalHealthController.updateById)
router.delete("/mentalHealth/:id",mentalHealthController.deleteById)

//symptoms routes
router.post("/symptoms",symptomController.create)
router.get("/symptoms",symptomController.get)
router.get("/symptoms/:id",symptomController.getById)
router.put("/symptoms/:id",symptomController.updateById)
router.delete("/symptoms/:id",symptomController.deleteById)


//timeLine routes
router.post("/timeLine",timeLineController.create)
router.get("/timeLine",timeLineController.get)
router.get("/timeLine/:id",timeLineController.getById)
router.put("/timeLine/:id",timeLineController.updateById)
router.delete("/timeLine/:id",timeLineController.deleteById)




// GET ALL
router.get(
  "/all",
  getAllDiseases
);


// SEARCH
router.get(
  "/search",
  searchDiseases
);


// SINGLE DISEASE
router.get(
  "/:name",
  getDiseaseDetails
);

module.exports = router;
