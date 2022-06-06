import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import onError from '../../../../backend/utils/errors';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import { getPage } from '../../../../backend/controllers/websiteController';

const handler = nc({ onError });

dbConnect();

handler.get(getPage);

export default handler;
