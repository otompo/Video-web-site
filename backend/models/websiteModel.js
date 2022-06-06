import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const websiteSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      lowercase: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    testimonialTitleOne: {
      type: String,
      required: true,
    },
    testimonialTitleTwo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Website ||
  mongoose.model('Website', websiteSchema);
