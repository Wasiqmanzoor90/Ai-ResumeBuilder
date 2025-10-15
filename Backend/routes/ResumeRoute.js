import express from 'express'
import { Create, Download, Resume, update } from '../controller/ResumeController.js';
import authenticateToken from '../config/VerifyToken.js';
import { DeleteResume } from '../service/ResumeService/ResumeService.js';

const router = express.Router();

router.post('/', authenticateToken,Create);
router.get("/:id", authenticateToken,Resume);
router.put('/:userId/:resumeId', authenticateToken,update); 
router.post('/:ResumeId',authenticateToken ,Download);
router.post('/Delete/:resumeId',authenticateToken, DeleteResume);

export default router;