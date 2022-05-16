import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import { deletePartner } from '../../../../backend/controllers/partnessController';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).delete(deletePartner);

export default handler;
