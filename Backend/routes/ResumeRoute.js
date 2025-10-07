import express from 'express'
import { createResume, UpdateResume } from '../service/ResumeService/ResumeService.js';
import { Resume } from '../controller/ResumeController.js';

const router = express.Router();

router.post('/', createResume);
router.get("/:id", Resume);
router.put('/:userId/:resumeId', UpdateResume); 

export default router;