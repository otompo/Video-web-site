import mongoose from 'mongoose';
const { Schema } = mongoose;

const priceSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      max: 32,
    },

    description: {
      type: {},
      minlength: 200,
    },

    video: {},

    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Price || mongoose.model('Price', priceSchema);
