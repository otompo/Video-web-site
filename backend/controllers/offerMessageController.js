import OfferMessage from '../models/offerMessageModel';
import AWS from 'aws-sdk';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig);

// create contact message
export const createOfferMessage = catchAsync(async (req, res) => {
  const {
    firstName,
    surName,
    email,
    budget,
    city,
    selectedOffer,
    phoneNumber,
    message,
  } = req.body;
  //   console.log(req.body);
  //   return;
  if (
    !firstName ||
    !surName ||
    !email ||
    !budget ||
    !city ||
    !selectedOffer ||
    !phoneNumber ||
    !message
  ) {
    return next(new AppError('All Fields are required', 404));
  }

  const contact = await OfferMessage({
    firstName: firstName,
    surName: surName,
    email: email,
    city: city,
    budget: budget,
    phoneNumber: phoneNumber,
    message: message,
    selectedOffer: selectedOffer,
  }).save();

  res.status(200).send({ success: true });
});

// get all contact messages
export const getAllOfferMessages = catchAsync(async (req, res) => {
  const messages = await OfferMessage.find({}).sort({ createdAt: -1 });
  res.status(200).send(messages);
});

// get total contacts
export const getTotalMessages = catchAsync(async (req, res) => {
  const messages = await OfferMessage.find({ replyed: { $ne: true } });
  res.status(200).send({
    total: messages.length,
    contact: null,
  });
});

// get single contact message
export const getSingleOfferMessage = catchAsync(async (req, res, next) => {
  const message = await OfferMessage.findById(req.query.id);
  if (!message) {
    return next(new AppError('Meesage not found', 404));
  }
  res.status(200).send(message);
});

// delete message
export const deleteMessage = catchAsync(async (req, res, next) => {
  const massage = await OfferMessage.findById(req.query.id);
  const data = await OfferMessage.findByIdAndRemove(massage._id);
  if (!data) {
    return next(new AppError('Meesage not found', 404));
  }
  res.status(200).send({ status: 'Success' });
});

// reply message
export const replyMessage = catchAsync(async (req, res, next) => {
  const { email, replyedMessage } = req.body;
  // console.log(email);
  if (!email || !replyedMessage) {
    return next(new AppError('Plese fields can not be empty', 400));
  }

  const message = await OfferMessage.findById(req.query.id);
  if (!message) {
    return next(new AppError('Message not found', 404));
  }

  const result = await OfferMessage.findByIdAndUpdate(
    message._id,
    { replyedMessage, replyed: true, replyedDate: new Date() },
    // { new: true },
  );

  // prepare for email
  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },

    ReplyToAddresses: [process.env.EMAIL_FROM],

    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<html>                          
              <div>
              <p style="font-size:16px, text-align:justify">${replyedMessage}</p>
              </div>
              <br/>
              <i style="font-size:16px">codesmartwebsoft.com</i>
            </html>
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Message',
      },
    },
  };
  const emailSent = SES.sendEmail(params).promise();
  emailSent
    .then((data) => {
      // console.log(data);
      res.json({ ok: true });
    })
    .catch((err) => {
      console.log(err);
    });
});
