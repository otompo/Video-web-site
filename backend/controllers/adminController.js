import User from '../models/userModel';
import TeamsOfService from '../models/teamsOfServiceModel';
import catchAsync from '../utils/catchAsync';
import { nanoid } from 'nanoid';
import AppError from '../utils/appError';
import bcrypt from 'bcryptjs';

export const currentAdmin = catchAsync(async (req, res) => {
  let user = await User.findById(req.user._id).select('-password');
  // console.log("CURRENT INSTRUCTOR => ", user);
  if (!user.role.includes('Admin')) {
    return res.sendStatus(403);
  } else {
    res.json({ ok: true });
  }
});

// add staff
export const addStaff = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  let userExist = await User.findOne({ email }).exec();
  if (userExist) return next(new AppError('Email is take', 404));
  let password = nanoid(10);
  const user = await new User({
    name: name,
    email: email,
    username: `${nanoid(5)}`,
    role: 'Staff',
    password: bcrypt.hashSync(password),
    generatedPasword: password,
  }).save();

  // const token = signToken(user._id, user.email);
  res.status(201).json({
    status: 'success',
    user,
  });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  // Get the user from the database
  const user = await User.findById(req.user._id).select('+password');

  // Check id the Posted current password is correct

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('your current password is wrong', 401));
  }

  // If password is correct update password
  user.password = req.body.password;
  user.generatedPasword = '';
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //Log user in, send password

  // createSendToken(user, 200, res);
  // const token = signToken(user._id);
  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  });
});

// make user an admin
export const makeUserAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.query.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const roleUpdated = await User.findByIdAndUpdate(
    user._id,
    {
      $addToSet: { role: 'Admin' },
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
      $pull: { role: 'Admin' },
    },
    { new: true },
  );
  res.send({ ok: true });
  // console.log(roleUpdated);
});

export const createTeamsOfService = catchAsync(async (req, res, next) => {
  const { description } = req.body;
  if (!description) {
    return next(new AppError('description is empty'));
  }
  const teamsofservice = await new TeamsOfService({
    slug: `${nanoid(5)}`,
    description,
  }).save();
  res.send(teamsofservice);
});

export const getTeamsOfService = catchAsync(async (req, res, next) => {
  const teamsofservice = await TeamsOfService.find({});
  res.send(teamsofservice);
});

export const readTeamsOfService = catchAsync(async (req, res, next) => {
  const teamsofservice = await TeamsOfService.findOne({ slug: req.query.slug });
  res.send(teamsofservice);
});

export const updateTeamsOfService = catchAsync(async (req, res, next) => {
  const { slug } = req.query;
  const blog = await TeamsOfService.findOne({ slug });
  if (!blog) {
    return next(new AppError('Teams Of Service not found', 404));
  }

  const updated = await TeamsOfService.findOneAndUpdate(
    { slug },
    {
      ...req.body,
    },
    {
      new: true,
    },
  );
  res.json(updated);
});
