import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import { deletePrice } from '../../../../backend/controllers/priceController';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).delete(deletePrice);

export default handler;
