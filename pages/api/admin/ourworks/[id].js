import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import { removeWork } from '../../../../backend/controllers/ourworksController';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).delete(removeWork);

export default handler;
