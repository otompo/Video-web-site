import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';
import { getAllOfferMessages } from '../../../../backend/controllers/offerMessageController';
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).get(getAllOfferMessages);

export default handler;
