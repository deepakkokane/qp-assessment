import { ApiError } from "common-microservices-utils";
import { Request } from "express";
import {
  Result,
  validationResult,
} from "express-validator/src/validation-result";
import { StatusCodes } from "http-status-codes";
import { API_ERRORS } from "../constants/app.constant";
import GroceryItemRepository from "../repositories/groceryItem.repository";

class GroceryItemService {
  groceryItem: GroceryItemRepository;

  constructor() {
    this.groceryItem = new GroceryItemRepository();
  }

  getAllGroceryItems = async () => {
    return await this.groceryItem.getAll();
  };

  addNewGroceryItem = async (req: Request) => {
    const data = req.body;

    const result: Result = validationResult(req);

    if (!result.isEmpty()) {
      throw new ApiError(StatusCodes.BAD_REQUEST, result.array()[0].msg);
    }

    const item = await this.groceryItem.create(data);
    if (item) {
      return item;
    } else {
      throw new ApiError(
        StatusCodes.FORBIDDEN,
        API_ERRORS.UNABLE_TO_CREATE_GROCERY_ITEM
      );
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateQuantityOfExistingItem = async (req: Request) => {
    const data = req.body;
    const id: number = parseInt(req.params.id);

    const item = await this.groceryItem.getById(id);

    const result: Result = validationResult(req);

    if (!result.isEmpty()) {
      throw new ApiError(StatusCodes.BAD_REQUEST, result.array()[0].msg);
    }

    if (!item)
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        API_ERRORS.ITEM_NOT_FOUND_WITH_ID
      );

    return await this.groceryItem.update(id, data);
  };

  removeItemFromList = async (req: Request) => {
    const id: number = parseInt(req.params.id);

    const item = await this.groceryItem.getById(id);

    if (!item)
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        API_ERRORS.ITEM_NOT_FOUND_WITH_ID
      );

    return await this.groceryItem.delete(id);
  };
}
export default GroceryItemService;
