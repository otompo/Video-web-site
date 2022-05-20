import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import onError from '../../../../backend/utils/errors';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import {
  readTeamsOfService,
  updateTeamsOfService,
} from '../../../../backend/controllers/adminController';

const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).get(readTeamsOfService);
handler.use(isAuth, isAdmin).put(updateTeamsOfService);

export default handler;
