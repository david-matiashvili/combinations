import express from 'express';

// Controllers
import combinationController from '../controllers/combination_controller.js';
// Middlewares
import combinationPostValidation from '../middlewares/validation/combination_post_validation.js';

const router = express.Router();

router.post('/combination', combinationPostValidation, combinationController.postCombination);

export default router;