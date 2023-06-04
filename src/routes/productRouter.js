import { Router } from "express";
import {
    getAllController,
    getByIDController,
    addController,
    updateController,
    deleteByIDController,
} from '../controllers/productController.js'

const router = Router();

router.get("/", getAllController);
router.get("/:id",  getByIDController);
router.post("/", addController);
router.put("/:id", updateController);
router.delete("/:id", deleteByIDController);

export default router;