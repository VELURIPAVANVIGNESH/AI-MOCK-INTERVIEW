import express from 'express';
import { createNewWorkRole, getoneWorkRole } from '../controllers/workRole.controller.js';
import { getuserwithworkRole } from '../controllers/workRole.controller.js';
import { updateWorkRole } from '../controllers/workRole.controller.js';


const router = express.Router();

router.post('/workRole', createNewWorkRole);    
router.post('/workRole/users', getuserwithworkRole);
router.post('/workRole/update', updateWorkRole);
router.post('/workRole/getuser', getoneWorkRole);

export default router;