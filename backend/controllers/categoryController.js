import Category from '../models/categoryModel';
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

// create category
export const createCategory = catchAsync(async (req, res, next) => {
  //   console.log(req.body);
  const { title, description, profileImage } = req.body;

  let slug = slugify(title).toLowerCase();

  const alreadyExist = await Category.findOne({ slug });
  if (alreadyExist) {
    return next(new AppError('Category name already exist', 400));
  }

  let category = await new Category({
    title: title,
    description: description,
    image: profileImage,
    slug,
  }).save();
  res.status(200).send(category);
});

// get all category
export const getAllCategories = catchAsync(async (req, res, next) => {
  const category = await Category.find({});
  // if (!data) return res.status(400).send({ error: 'Categories not found' });
  res.status(200).send({
    total: category.length,
    category,
  });
});

export const deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.query.id);
  const params = {
    Bucket: category.image.Bucket,
    Key: category.image.Key,
  };
  // send remove request to S3
  S3.deleteObject(params, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
  });

  if (!category) {
    return next(new AppError('Category not found with this ID', 400));
  }

  await category.remove();

  res.status(200).json({
    success: true,
  });
});
