import { Router } from "express";
import {
    getAllController,
    getByIDController,
    addController,
    updateController,
    deleteByIDController,
    getByKeyController
} from '../controllers/productController.js'
import { isAdmin, isPremium } from "../middlewares/authorization.js";
import { checkAuth } from "../jwt/auth.js";

const router = Router();

router.get('/', getAllController);
router.get('/:pid',  getByIDController);
router.post('/', checkAuth, isPremium, addController);
router.put('/:pid', checkAuth, isAdmin, updateController);
router.delete('/:pid', checkAuth, isPremium, deleteByIDController);
router.get('/search/:key/:value', getByKeyController)

export default router;