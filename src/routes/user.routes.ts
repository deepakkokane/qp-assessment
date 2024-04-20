import express from "express";
import { API_ENDPOINTS } from "../constants/app.constant";
import GroceryItemController from "../controllers/groceryItem.controller";
import OrderController from "../controllers/order.controller";

const userRoutes = express.Router();
const GIController = new GroceryItemController();

const orderController = new OrderController();

userRoutes
  .route(API_ENDPOINTS.GROCERY_ITEM)
  .get(GIController.getAllGroceryItems);

userRoutes.route(API_ENDPOINTS.ORDER).post(orderController.createNewOrder);

export default userRoutes;
