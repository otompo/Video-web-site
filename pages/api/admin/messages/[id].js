import nc from 'next-connect';
import {
  deleteMessage,
  getSingleMessage,
  replyMessage,
} from '../../../../backend/controllers/messageController';
import dbConnect from '../../../../backend/config/dbConnect';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).get(getSingleMessage);
handler.use(isAuth, isAdmin).delete(deleteMessage);
handler.use(isAuth, isAdmin).post(replyMessage);

export default handler;
