import Partner from '../models/partnessModel';
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

// create Partner
export const createPartner = catchAsync(async (req, res, next) => {
  //   console.log(req.body);
  const { name, profileImage } = req.body;

  let slug = slugify(name).toLowerCase();

  const alreadyExist = await Partner.findOne({ slug });
  if (alreadyExist) {
    return next(new AppError('Partner name already exist', 400));
  }

  let partner = await new Partner({
    name: name,
    image: profileImage,
    slug,
  }).save();
  res.status(200).send(partner);
});

// get all Partner
export const getAllPartness = catchAsync(async (req, res, next) => {
  const partners = await Partner.find({});
  // if (!data) return res.status(400).send({ error: 'Categories not found' });
  res.status(200).send({
    total: partners.length,
    partners,
  });
});

export const deletePartner = catchAsync(async (req, res, next) => {
  const partner = await Partner.findById(req.query.id);
  const params = {
    Bucket: partner.image.Bucket,
    Key: partner.image.Key,
  };
  // send remove request to S3
  S3.deleteObject(params, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
  });

  if (!partner) {
    return next(new AppError('Partner not found with this ID', 400));
  }

  await partner.remove();

  res.status(200).json({
    success: true,
  });
});
