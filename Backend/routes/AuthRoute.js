import express from 'express'
import {alluser, login, register } from '../controller/AuthControlller.js';


const router = express.Router();

router.post('/register', register)
router.post('/', login)
router.get("/:id",alluser)

export default router;