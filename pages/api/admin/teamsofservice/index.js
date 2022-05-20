import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import onError from '../../../../backend/utils/errors';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import {
  getTeamsOfService,
  createTeamsOfService,
} from '../../../../backend/controllers/adminController';

const handler = nc({ onError });

dbConnect();

handler.get(getTeamsOfService);
handler.use(isAuth, isAdmin).post(createTeamsOfService);

export default handler;
