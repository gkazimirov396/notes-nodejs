import { Router } from 'express';

import isAuthenticated from '../middleware/is-auth.js';
import dashboardController from '../controllers/dashboardController.js';

const router = Router();

router.use(isAuthenticated);

router.get('/', dashboardController.getDashboardPage);

router
  .route('/note/:id')
  .get(dashboardController.getNoteDetailedPage)
  .put(dashboardController.updateNoteHandler)
  .delete(dashboardController.deleteNoteHandler);

router
  .route('/new')
  .get(dashboardController.getAddNewNotePage)
  .post(dashboardController.addNewNoteHandler);

router
  .route('/search')
  .get(dashboardController.getSearchNotePage)
  .post(dashboardController.searchNoteHandler);

export default router;
