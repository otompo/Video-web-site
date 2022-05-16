import nc from 'next-connect';
import dbConnect from '../../../backend/config/dbConnect';
import { login } from '../../../backend/controllers/authController';

import onError from '../../../backend/utils/errors';

const handler = nc({ onError });

dbConnect();

handler.post(login);

export default handler;
