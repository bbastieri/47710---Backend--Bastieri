import { Router } from "express";
import { 
    getAllController,
    getByIDController,
    createCartController,
    addToCartController,
    deleteCartByIDController,
    deleteFromCartController,
    updateProdQuantityController
} from '../controllers/cartController.js'

const router = Router();

router.get('/', getAllController);
router.get('/:id', getByIDController);
router.post('/', createCartController);
router.put('/:cartId/:prodId', addToCartController);
router.delete('/:cartId', deleteCartByIDController);
router.delete('/:cartId/:prodId', deleteFromCartController);
router.put('/:cartId/quantity/:prodId', updateProdQuantityController);

export default router;