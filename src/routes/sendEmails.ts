import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();

// Controllers
import { 
    sendNewBookingMailCtrl,
} from '@/controllers/sendMailController.js';

// middleWares
// import authMiddleware from '../middleware/auth.js'

router.use(bodyParser.json());


router.post(
    "/sendNewBookingMail",
    sendNewBookingMailCtrl
    // sendClientMailCtrl
);

// router.post(
//     "/sendAdminMail",
//     sendAdminMailCtrl
// );



export default router;