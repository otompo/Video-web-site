import nc from 'next-connect';
import dbConnect from '../../../backend/config/dbConnect';
import { getAllPartness } from '../../../backend/controllers/partnessController';
import onError from '../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.get(getAllPartness);

export default handler;
