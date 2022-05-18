import User from '../models/userModel';
import AWS from 'aws-sdk';
import { nanoid } from 'nanoid';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/auth';
var cloudinary = require('cloudinary');

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

// cloudinary.config({
//   cloud_name: 'codesmart',
//   api_key: '924552959278257',
//   api_secret: 'nyl74mynmNWo5U0rzF8LqzcCE8U',
// });

const S3 = new AWS.S3(awsConfig);

export const imageUpload = catchAsync(async (req, res) => {
  const { profileImage } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  if (user && user.profileImage) {
    user.profileImage = req.body.profileImage;
  }
  if (!profileImage) {
    return next(new AppError('No Image', 400));
  }
  //   prepare the image
  const base64Data = new Buffer.from(
    profileImage.replace(/^data:image\/\w+;base64,/, ''),
    'base64',
  );

  const type = profileImage.split(';')[0].split('/')[1];
  // image params
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${nanoid()}.${type}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
  };

  // upload to s3
  S3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      return res.send(400);
    }
    // console.log(data);
    res.send(data);
  });
});

// // update user profile image
export const updateImage = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.profileImage = req.body.profileImage;
  await user.save();
  // if (user && user.profileImage) {
  //   const params = {
  //     Bucket: user.profileImage.Bucket,
  //     Key: user.profileImage.Key,
  //   };
  //   // send remove request to S3
  //   S3.deleteObject(params, (err, data) => {
  //     if (err) {
  //       console.log(err);
  //       res.send(400);
  //     }
  //   });
  // }
  const token = signToken(user);
  // const userUpdated = await User.findByIdAndUpdate(
  //   user._id,
  //   {
  //     profileImage: req.body.profileImage,
  //   },
  //   { new: true },
  // );

  res.status(200).json({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    last_login_date: user.last_login_date,
    profileImage: user.profileImage,
    picture: user.picture,
    facebook: user.facebook,
    twitter: user.twitter,
    linkedIn: user.linkedIn,
    generatedPasword: user.generatedPasword,
  });
});

export const updateUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.facebook = req.body.facebook;
  user.twitter = req.body.twitter;
  user.linkedIn = req.body.linkedIn;
  await user.save();
  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    last_login_date: user.last_login_date,
    profileImage: user.profileImage,
    picture: user.picture,
    facebook: user.facebook,
    twitter: user.twitter,
    linkedIn: user.linkedIn,
    generatedPasword: user.generatedPasword,
  });
});

export const imageRemove = async (req, res) => {
  //   console.log(req.body);
  try {
    const { profileImage } = req.body;
    const params = {
      Bucket: profileImage.Bucket,
      Key: profileImage.Key,
    };
    // send remove request to S3
    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.send({ ok: true });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// make user an admin
export const makeUserAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.query.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const roleUpdated = await User.findByIdAndUpdate(
    user._id,
    {
      isAdmin: true,
    },
    { new: true },
  );
  res.send({ ok: true });
  // console.log(roleUpdated);
});

// remove user as an admin
export const removeUserAsAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.query.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  const roleUpdated = await User.findByIdAndUpdate(
    user._id,
    {
      isAdmin: false,
    },
    { new: true },
  );
  res.send({ ok: true });
  // console.log(roleUpdated);
});

// get users
export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.send(users);
});

// delete user
export const removeUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.query.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (user && user.profileImage) {
    // user.profileImage = req.body.profileImage;
    const params = {
      Bucket: user.profileImage.Bucket,
      Key: user.profileImage.Key,
    };
    // send remove request to S3
    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      }
    });
  }

  const data = await User.findByIdAndRemove(user._id);
  res.json({ message: 'User Deleted' });
});

// get single user data
export const readSingleUser = catchAsync(async (req, res, next) => {
  let username = req.query.username;
  const user = await User.findOne({ username }).select('-password');
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  res.send(user);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  // Get the user from the database
  const user = await User.findById(req.user._id).select('+password');

  // Check id the Posted current password is correct

  if (!bcrypt.compareSync(req.body.passwordCurrent, user.password)) {
    return next(new AppError('your current password is wrong', 401));
  }

  // If password is correct update password
  user.password = bcrypt.hashSync(req.body.password);
  user.generatedPasword = '';
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // createSendToken(user, 200, res);
  // const token = signToken(user._id);
  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  });
});
