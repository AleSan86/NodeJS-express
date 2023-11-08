import express from 'express';
import { MailController } from '../controllers/mail.controller.js';

export const mailRouter = express.Router();
const mailController = new MailController();

mailRouter.get('/', mailController.sendMail);