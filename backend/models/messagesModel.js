import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const messageSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
    },
    surName: {
      type: String,
      required: [true, 'Sur Name is required'],
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
    offer: [{ type: ObjectId, ref: 'Price', required: true }],
    message: {
      type: String,
      trim: true,
      required: [true, 'Message is required'],
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Message || mongoose.model('Message', messageSchema);
