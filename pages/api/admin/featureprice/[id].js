import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import { removeFeaturePrice } from '../../../../backend/controllers/featurePriceController';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).delete(removeFeaturePrice);

export default handler;
