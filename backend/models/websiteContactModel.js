import mongoose from 'mongoose';

const websiteContactSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      lowercase: true,
      required: true,
    },

    contactTitleOne: {
      type: String,
      required: true,
    },

    contactTitleTwo: {
      type: String,
      required: true,
    },
    contactTitleThree: {
      type: String,
      required: true,
    },

    contactTitleFour: {
      type: String,
      required: true,
    },

    contactDescriptionOne: {
      type: String,
      required: true,
    },

    contactDescriptionTwo: {
      type: String,
      required: true,
    },
    contactDescriptionThree: {
      type: String,
      required: true,
    },

    contactDescriptionFour: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.WebsiteContact ||
  mongoose.model('WebsiteContact', websiteContactSchema);
