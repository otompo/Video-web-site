import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import {
  createService,
  getAllServices,
} from '../../../../backend/controllers/servicesController';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).post(createService);

handler.use(isAuth, isAdmin).get(getAllServices);

export default handler;
