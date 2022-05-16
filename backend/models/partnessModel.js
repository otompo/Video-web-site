import mongoose from 'mongoose';
const { Schema } = mongoose;

const partnerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      max: 32,
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
  mongoose.models.Partner || mongoose.model('Partner', partnerSchema);
