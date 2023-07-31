import { Router } from "express";
import {
    getAllController,
    getByIDController,
    addController,
    updateController,
    deleteByIDController,
    getByKeyController
} from '../controllers/productController.js'
import { isAdmin } from "../middlewares/authorization.js";
import { checkAuth } from "../jwt/auth.js";

const router = Router();

router.get('/', getAllController);
router.get('/:pid',  getByIDController);
router.post('/', checkAuth, isAdmin, addController);
router.put('/:pid', checkAuth, isAdmin, updateController);
router.delete('/:pid', checkAuth, isAdmin, deleteByIDController);
router.get('/search/:key/:value', getByKeyController)

export default router;