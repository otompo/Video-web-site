import nc from 'next-connect';
import { getAllMessages } from '../../../../backend/controllers/messageController';
import dbConnect from '../../../../backend/config/dbConnect';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).get(getAllMessages);

export default handler;
