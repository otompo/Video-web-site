import About from '../models/aboutModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { nanoid } from 'nanoid';
import AWS from 'aws-sdk';

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

// create about
export const createAbout = catchAsync(async (req, res, next) => {
  let { description, video } = req.body;
  //   const alreadyExist = await About.findOne({ slug });
  //   if (alreadyExist) {
  //     return next(new AppError('About already exist', 400));
  //   }

  let about = await new About({
    slug: `${nanoid(5)}`,
    description: description,
    video: video,
  }).save();

  res.status(200).send(about);
});

// get all about
export const getAllAbout = catchAsync(async (req, res, next) => {
  const data = await About.find({});
  // if (!data) return res.status(400).send({ error: 'Categories not found' });
  res.status(200).send(data);
});

export const getSingleAbout = catchAsync(async (req, res, next) => {
  const { slug } = req.query;
  const about = await About.findOne({ slug: req.query.slug });
  res.send(about);
});

export const updateAbout = catchAsync(async (req, res, next) => {
  const { slug } = req.query;
  const blog = await About.findOne({ slug });
  if (!blog) {
    return next(new AppError('About not found', 404));
  }

  const updated = await About.findOneAndUpdate(
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

export const updateAboutVideo = catchAsync(async (req, res, next) => {
  const { slug } = req.query;
  const about = await About.findOne({ slug });
  if (!about) {
    return next(new AppError('Video not found', 404));
  }

  const params = {
    Bucket: about.video.Bucket,
    Key: about.video.Key,
  };
  // send remove request to S3
  S3.deleteObject(params, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
  });

  const updated = await About.findOneAndUpdate(
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

export const deletePrice = catchAsync(async (req, res, next) => {
  const price = await About.findById(req.query.id);

  const params = {
    Bucket: price.video.Bucket,
    Key: price.video.Key,
  };
  // send remove request to S3
  S3.deleteObject(params, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
  });

  if (!price) {
    return next(new AppError('Price not found with this ID', 400));
  }

  await price.remove();

  res.status(200).json({
    success: true,
  });
});
