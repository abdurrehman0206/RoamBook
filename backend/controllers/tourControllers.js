const mongoose = require("mongoose");
const Tour = require("../models/tourModel");

const postTour = async (req, res) => {
  const {
    title,
    description,
    destination,
    price,
    startDate,
    endDate,
    itinerary,
    images,
  } = req.body;
  if (
    !title ||
    !description ||
    !destination ||
    !itinerary ||
    !images ||
    !price ||
    !startDate ||
    !endDate
  ) {
    return res.status(400).send({
      success: false,
      message: "Please fill all the required fields",
      error: "Empty fields",
    });
  }

  const tourData = new Tour({
    title,
    description,
    destination,
    duration: Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    ),
    price,
    startDate,
    endDate,
    itinerary,
    images,
  });
  try {
    const tour = await Tour.create(tourData);
    return res.status(200).send({
      success: true,
      message: "Tour created successfully",
      data: tour,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      error: "Posting Failed",
    });
  }
};
const getTours = async (req, res) => {
  try {
    const tours = await Tour.find({}).sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Tours fetched successfully",
      data: tours,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      error: "Fetching Failed",
    });
  }
};
const getTour = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(500).send({
      success: false,
      message: "Fetching Failed",
      error: "Invalid ID",
    });
  }
  try {
    const tour = await Tour.findById(id);
    return res.status(200).send({
      success: true,
      message: "Tour fetched successfully",
      data: tour,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Fetching Failed",
      error: error.message,
    });
  }
};
const updateTour = async (req, res) => {};
const rateTour = async (req, res) => {};
const bookTour = async (req, res) => {};

module.exports = {
  getTours,
  getTour,
  postTour,
  updateTour,
  bookTour,
  rateTour,
};
