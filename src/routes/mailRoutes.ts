import express from 'express';
import { createMail, deleteMail, editMail, getAll } from '../controllers/mailController';

const router = express.Router();

router.post('/mail/create', createMail);
router.get('/mail/all', getAll);
router.put('/mail/edit', editMail);
router.delete('/mail/delete', deleteMail);

export default router;
