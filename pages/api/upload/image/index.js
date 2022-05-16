import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import { uploadProfileImage } from '../../../../backend/controllers/userController';
import { isAuth } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.use(isAuth).post(uploadProfileImage);
export const config = { api: { bodyParser: { sizeLimit: '25mb' } } };
export default handler;
