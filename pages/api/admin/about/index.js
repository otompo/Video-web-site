import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import {
  createAbout,
  getAllAbout,
} from '../../../../backend/controllers/aboutController';
import { isAdmin, isAuth } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.get(getAllAbout);
handler.use(isAuth, isAdmin).post(createAbout);

export default handler;
