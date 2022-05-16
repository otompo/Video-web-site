import nc from 'next-connect';
import dbConnect from '../../../backend/config/dbConnect';
import { createOfferMessage } from '../../../backend/controllers/offerMessageController';
import onError from '../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.post(createOfferMessage);

export default handler;
