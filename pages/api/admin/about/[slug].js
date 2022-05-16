import nc from 'next-connect';
import dbConnect from '../../../../backend/config/dbConnect';
import {
  getSingleAbout,
  updateAbout,
  updateAboutVideo,
} from '../../../../backend/controllers/aboutController';
import { isAuth, isAdmin } from '../../../../backend/middlewares';
import onError from '../../../../backend/utils/errors';
const handler = nc({ onError });

dbConnect();

handler.use(isAuth, isAdmin).get(getSingleAbout);
handler.use(isAuth, isAdmin).patch(updateAbout);
handler.use(isAuth, isAdmin).put(updateAboutVideo);

export default handler;
