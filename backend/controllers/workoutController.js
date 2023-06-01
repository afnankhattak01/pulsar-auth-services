const Joi = require("joi");
const workout = require("../models/workout");
const mongoose = require("mongoose");
const signupSchema = Joi.object({
  title: Joi.string().required("Title is a required field!"),
  reps: Joi.number().required("Reps is a required field!"),
  load: Joi.number().required("load is a required field!"),
});

const getWorkouts = async (req, res) => {
  try {
    const allWorkouts = await workout
      .find({ user_id: req.user._id })
      .sort({ createdAt: -1 });
    return res.json({
      workouts: allWorkouts,
      success: true,
      message: "successfully  retrieved list of workouts!",
    });
  } catch (error) {
    console.log("error getting records:", error.message);
  }
};

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: `no workouts foud with ${id}`, success: false });
  }

  try {
    const theWorkout = await workout.findById(id);

    return res.status(200).json({ data: theWorkout });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `no workouts foud with id ${id}`, success: false });
  }
};

const createWorkout = async (req, res) => {
  const { _id } = req.user;
  const { error, value } = signupSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.details,
    });
  }

  const { title, reps, load } = req.body;

  try {
    const newWorkout = await workout.create({
      title,
      reps,
      load,
      user_id: _id,
    });

    return res.status(200).json({
      data: newWorkout,
      success: true,
      message: "successfully saved new workouts!",
    });
  } catch (error) {
    console.log("err", error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: `no workouts foud with id ${id}`, success: false });
  }

  const deleteWorkout = await workout.findOneAndDelete({ _id: id });

  if (!deleteWorkout) {
    return res.status(404).json({
      message: `no workouts foud to delete with id ${id}`,
      success: false,
    });
  }

  return res.status(200).json({ success: true, data: deleteWorkout });
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: `no workouts foud with id ${id}`, success: false });
  }

  try {
    const updatedData = await workout.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    return res.json({
      message: `successfully updated item with id ${id} `,
      success: true,
      updatedData,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: `update error for id ${id}`, success: false });
  }
};

const deleteAllWokOuts = async (req, res) => {
  try {
    const isDeleteAll = await workout.deleteMany({});

    return res.json({
      message: `successfully deleted all data `,
      success: true,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: `update error for id ${id}`, success: false });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
  deleteAllWokOuts,
};
