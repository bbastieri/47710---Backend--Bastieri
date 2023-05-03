import { Router } from "express";
import CartManager from "../managers/cartManager";

const router = Router();
const cartManager = new CartManager('./cart.json')

export default cartRouter;