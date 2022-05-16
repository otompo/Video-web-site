import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import {
  createOurWorks,
  getAllWorks,
} from '../../../../backend/controllers/ourworksController';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).post(createOurWorks);
handler.use(isAuth, isAdmin).get(getAllWorks);

export default handler;
