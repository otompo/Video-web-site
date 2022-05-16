import mongoose from 'mongoose';
const { Schema } = mongoose;

const aboutSchema = new Schema(
  {
    description: {
      type: {},
      minlength: 200,
    },

    video: {},

    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.models.About || mongoose.model('About', aboutSchema);
