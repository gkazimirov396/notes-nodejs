import { Router } from 'express';

import aboutController from '../controllers/aboutController.js';

const router = Router();

router.get('/', aboutController.getAboutPage);

export default router;
