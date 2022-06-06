import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import onError from '../../../../backend/utils/errors';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import { createPage } from '../../../../backend/controllers/websiteController';

const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).post(createPage);

export default handler;
