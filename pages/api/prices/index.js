import nc from 'next-connect';
import dbConnect from '../../../backend/config/dbConnect';
import {
  createPrice,
  getAllPrices,
} from '../../../backend/controllers/priceController';
import { isAuth } from '../../../backend/middlewares';

import onError from '../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.get(getAllPrices);
handler.use(isAuth).post(createPrice);

export const config = {
  api: { bodyParser: { sizeLimit: '25mb' } },
};
export default handler;
