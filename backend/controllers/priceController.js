import Price from '../models/priceModel';
import slugify from 'slugify';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import AWS from 'aws-sdk';

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

// create prices
export const createPrice = catchAsync(async (req, res, next) => {
  let { name, description, video } = req.body;
  let slug = slugify(name).toLowerCase();
  // if (user && user.profileImage) {
  //   user.profileImage = req.body.profileImage;
  // }
  const alreadyExist = await Price.findOne({ slug });
  if (alreadyExist) {
    return next(new AppError('Price already exist', 400));
  }

  let price = await new Price({
    slug,
    name: name,
    description: description,
    video: video,
  }).save();
  res.status(200).send(price);
});

// get all prices
export const getAllPrices = catchAsync(async (req, res, next) => {
  const data = await Price.find({});
  // if (!data) return res.status(400).send({ error: 'Categories not found' });
  res.status(200).send(data);
});

export const deletePrice = catchAsync(async (req, res, next) => {
  const price = await Price.findById(req.query.id);

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
