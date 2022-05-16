import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    title: {
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
  mongoose.models.Category || mongoose.model('Category', categorySchema);
