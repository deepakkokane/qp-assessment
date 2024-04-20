import express from "express";
import { checkSchema } from "express-validator";
import { API_ENDPOINTS } from "../constants/app.constant";
import {
  createGrocerySchamaValidation,
  updateGrocerySchemaValidation,
} from "../constants/validation.constant";
import GroceryItemController from "../controllers/groceryItem.controller";

const adminRoutes = express.Router();
const GIController = new GroceryItemController();

adminRoutes
  .route(API_ENDPOINTS.GROCERY_ITEM)
  .post(
    checkSchema(createGrocerySchamaValidation),
    GIController.addNewGroceryItem
  )
  .get(GIController.getAllGroceryItems);

adminRoutes
  .route(API_ENDPOINTS.GROCERY_ITEM_ID)
  .put(
    checkSchema(updateGrocerySchemaValidation),
    GIController.updateQuantityOfExistingItem
  )
  .delete(GIController.removeItemFromList);

export default adminRoutes;
