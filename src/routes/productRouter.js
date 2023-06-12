import { Router } from "express";
import {
    getAllController,
    getByIDController,
    addController,
    updateController,
    deleteByIDController,
    getByKeyController
} from '../controllers/productController.js'

const router = Router();

router.get('/', getAllController);
router.get('/:pid',  getByIDController);
router.post('/', addController);
router.put('/:pid', updateController);
router.delete('/:pid', deleteByIDController);
router.get('/search/:key/:value', getByKeyController)

export default router;