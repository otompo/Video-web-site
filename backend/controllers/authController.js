import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import { comparePassword, hashPassword } from '../utils/authHelpers';
import AWS from 'aws-sdk';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import shortId from 'shortid';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { signToken } from '../utils/auth';

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};
const SES = new AWS.SES(awsConfig);

export const login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select(
    '+password',
  );
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profileImage: user.profileImage,
      picture: user.picture,
      facebook: user.facebook,
      twitter: user.twitter,
      linkedIn: user.linkedIn,
      generatedPasword: user.generatedPasword,
    });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
    // return next(new AppError('User not found', 404));
  }
});

export const register = catchAsync(async (req, res, next) => {
  let username = shortId.generate();
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
    username,
  });
  const user = await newUser.save();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    username,
  });
});

// Current user profile =>/api/profile
export const currentUserProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log(user);
  res.send(user);
});

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password').exec();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const sendTestEmail = async (req, res) => {
  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: ['tophealthtv@gmail.com'],
    },

    ReplyToAddresses: [process.env.EMAIL_FROM],

    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<html>
                <h1>Reset password link</h1>
                <p>
                please use the following link to reset your password
                </p> 
            </html>
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Password Resest Link',
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
};

// forget password
export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  // console.log(email);
  const shortCode = nanoid(6).toUpperCase();
  const user = await User.findOneAndUpdate(
    { email },
    { passwordResetCode: shortCode },
    { new: true },
  );

  if (!user) {
    return next(new AppError('User not found', 404));
  }

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
              <h1>Reset Password Link</h1>
              <p>
                Please use the following code to reset your password
              </p>
              <h2 style="color:red; font-size:18px">${shortCode}</h2>
              <i style="font-size:16px">codesmartwebsoft.com</i>
            </html>
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Password Resest Link',
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

export const resetPassword = catchAsync(async (req, res, next) => {
  const { email, code, newPassword } = req.body;
  // console.table({email, code, newPassword});
  const hashedPassword = await hashPassword(newPassword);
  const user = await User.findOneAndUpdate(
    {
      email,
      passwordResetCode: code,
    },
    {
      password: hashedPassword,
      passwordResetCode: '',
    },
  );
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  return res.status(200).json({ ok: true });
});
