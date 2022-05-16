import nc from 'next-connect';
import { deleteMessage } from '../../../../backend/controllers/messageController';
import dbConnect from '../../../../backend/config/dbConnect';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';
import { getSingleOfferMessage } from '../../../../backend/controllers/offerMessageController';
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).get(getSingleOfferMessage);
handler.use(isAuth, isAdmin).delete(deleteMessage);

export default handler;
