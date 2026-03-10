import express from 'express';
import { submitContact, listContacts } from '../controllers/contactController.js';
import adminAuth from '../middleware/adminAuth.js';

const contactRouter = express.Router();

contactRouter.post('/submit', submitContact);
contactRouter.get('/list', adminAuth, listContacts);

export default contactRouter;
