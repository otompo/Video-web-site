import nc from 'next-connect';
import dbConnect from '../../../backend/config/dbConnect';
import { getAllServices } from '../../../backend/controllers/servicesController';
import onError from '../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.get(getAllServices);

export default handler;
