import mongoose from 'mongoose';
const { Schema } = mongoose;

const teamsofserviceSchema = new Schema(
  {
    description: {
      type: {},
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.TeamsOfService ||
  mongoose.model('TeamsOfService', teamsofserviceSchema);
