const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  itinerary: [
    {
      day: Number,
      description: String,
      _id: false,
    },
  ],
  images: [String],
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      review: String,
      _id: false,
    },
  ],
});
module.exports = mongoose.model("Tour", tourSchema);
