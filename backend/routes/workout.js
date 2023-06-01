const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
  deleteAllWokOuts,
} = require("../controllers/workoutController");

const {requireAuth} = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);

router.get("/getWorkouts", getWorkouts);
router.get("/getWorkout/:id", getSingleWorkout);
router.post("/addworkout", createWorkout);
router.delete("/deleteworkout/:id", deleteWorkout);
router.patch("/updateWorkout/:id", updateWorkout);
router.delete("/deleteAll", deleteAllWokOuts);
module.exports = router;
