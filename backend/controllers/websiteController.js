import Website from '../models/websiteModel';
import AWS from 'aws-sdk';

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

// homepage, getHomepage
export const createPage = async (req, res) => {
  try {
    const { page, video } = req.body;
    const found = await Website.findOne({ page });

    if (found) {
      const params = {
        Bucket: found.video.Bucket,
        Key: found.video.Key,
      };
      // send remove request to S3
      S3.deleteObject(params, (err, data) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        }
      });

      // update
      const updated = await Website.findOneAndUpdate(
        { page },
        { ...req.body, video },
        {
          new: true,
        },
      );
      return res.json(updated);
    } else {
      // create
      const created = await new Website({ ...req.body, video }).save();
      return res.json(created);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPage = async (req, res) => {
  try {
    const { page } = req.query;
    const found = await Website.findOne({ page });
    return res.json(found);
  } catch (err) {
    console.log(err);
  }
};
