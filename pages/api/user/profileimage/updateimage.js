import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import { updateImage } from '../../../../backend/controllers/userController';
import onError from '../../../../backend/utils/errors';
import { isAuth } from '../../../../backend/middlewares';
const handler = nc({ onError });

dbConnect();

handler.use(isAuth).put(updateImage);

export default handler;
