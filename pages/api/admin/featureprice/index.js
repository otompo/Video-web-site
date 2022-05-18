import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import {
  createFeatureprice,
  getAllFeature,
} from '../../../../backend/controllers/featurePriceController';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).get(getAllFeature);
handler.use(isAuth, isAdmin).post(createFeatureprice);

export default handler;
