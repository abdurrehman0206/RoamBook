const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getTours,
  getTour,
  postTour,
  updateTour,
  bookTour,
  rateTour,
} = require("../controllers/tourControllers");
router.use(requireAuth);
router.get("/", getTours);
router.get("/:id", getTour);
router.post("/", postTour);
router.put("/:id", updateTour);
router.patch("/:id", bookTour);
router.patch("/:id", rateTour);

module.exports = router;
