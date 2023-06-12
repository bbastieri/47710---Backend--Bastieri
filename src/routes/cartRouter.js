import { Router } from "express";
import { 
    getAllController,
    getByIDController,
    createCartController,
    addToCartController,
    deleteFromCartController,
    updateProdQuantityController
} from '../controllers/cartController.js'

const router = Router();

router.get('/', getAllController);
router.get('/:id', getByIDController);
router.post('/', createCartController);
router.put('/:cid/:pid', addToCartController);
router.delete('/:cid/:pid', deleteFromCartController);
router.put('/:cid/quantity/:pid', updateProdQuantityController);

export default router;