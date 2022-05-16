import nc from 'next-connect';
import dbConnect from '../../../backend/config/dbConnect';
import onError from '../../../backend/utils/errors';
import { currentUserProfile } from '../../../backend/controllers/authController';
import { isAuth } from '../../../backend/middlewares';

const handler = nc({ onError });
dbConnect();
handler.use(isAuth).get(currentUserProfile);

export default handler;
