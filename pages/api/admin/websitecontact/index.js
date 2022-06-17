import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import onError from '../../../../backend/utils/errors';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import { createContactPage } from '../../../../backend/controllers/websiteContactController';

const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).post(createContactPage);

export default handler;
