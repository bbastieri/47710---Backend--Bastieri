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

const router = Router();

router.get('/', getAllController);
router.get('/:pid',  getByIDController);
router.post('/', isAdmin, addController);
router.put('/:pid', isAdmin, updateController);
router.delete('/:pid', isAdmin, deleteByIDController);
router.get('/search/:key/:value', getByKeyController)

export default router;