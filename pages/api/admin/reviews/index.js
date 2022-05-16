import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import {
  createReviewVideo,
  getAllReviews,
} from '../../../../backend/controllers/reviewController';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).post(createReviewVideo);
handler.use(isAuth, isAdmin).get(getAllReviews);

export default handler;
