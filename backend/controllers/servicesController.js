import Service from '../models/servicesModel';
import slugify from 'slugify';
import AWS from 'aws-sdk';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

// create Service
export const createService = catchAsync(async (req, res, next) => {
  //   console.log(req.body);
  const { title, description, profileImage } = req.body;

  let slug = slugify(title).toLowerCase();

  const alreadyExist = await Service.findOne({ slug });
  if (alreadyExist) {
    return next(new AppError('Service name already exist', 400));
  }

  let service = await new Service({
    title: title,
    description: description,
    image: profileImage,
    slug,
  }).save();
  res.status(200).send(service);
});

// get all Service
export const getAllServices = catchAsync(async (req, res, next) => {
  const services = await Service.find({});
  // if (!data) return res.status(400).send({ error: 'Categories not found' });
  res.status(200).send({
    total: services.length,
    services,
  });
});

export const getSingleService = catchAsync(async (req, res, next) => {
  const { slug } = req.query.slug;
  const service = await Service.findOne({ slug });
  res.send(service);
});

export const updateService = catchAsync(async (req, res, next) => {
  const { slug } = req.query.slug;
  const service = await Service.findOne({ slug });
  if (!service) {
    return next(new AppError('Service not found', 400));
  }
  const updatedService = await Service.findOneAndUpdate(
    { slug },
    {
      ...req.body,
    },
    { new: true },
  );
  res.send(updatedService);
});

export const deleteService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.query.id);
  const params = {
    Bucket: service.image.Bucket,
    Key: service.image.Key,
  };
  // send remove request to S3
  S3.deleteObject(params, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
  });

  if (!service) {
    return next(new AppError('Service not found with this ID', 400));
  }

  await service.remove();

  res.status(200).json({
    success: true,
  });
});
