import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import onError from '../../../../backend/utils/errors';
import { getContactPage } from '../../../../backend/controllers/websiteContactController';

const handler = nc({ onError });

dbConnect();

handler.get(getContactPage);

export default handler;
