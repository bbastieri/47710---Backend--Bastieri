import { Router } from "express";
import { 
    getAllController,
    getByIDController,
    createCartController,
    addToCartController,
    deleteByIDController
} from '../controllers/cartController.js'

const router = Router();

router.get("/", getAllController);
router.get("/:cid", getByIDController);
router.post("/", createCartController);
router.post("/:cid/product/:pid", addToCartController);
router.delete("/:id", deleteByIDController);

export default router;