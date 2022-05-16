import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const offerMessageSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'First Name is required'],
    },
    surName: {
      type: String,
      trim: true,
      required: [true, 'Sur Name is required'],
    },
    budget: {
      type: String,
      trim: true,
      required: [true, 'Budget is required'],
    },
    city: {
      type: String,
      trim: true,
      required: [true, 'City is required'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: [true, 'Phone Number is required'],
    },
    selectedOffer: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      required: [true, 'Message is required'],
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.OfferMessage ||
  mongoose.model('OfferMessage', offerMessageSchema);
