import mongoose from 'mongoose';
const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      max: 32,
      uppercase: true,
    },

    description: {
      type: {},
      minlength: 200,
    },

    image: {},

    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Service || mongoose.model('Service', serviceSchema);
