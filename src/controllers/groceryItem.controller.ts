import { ApiResponse, asyncHandler } from "common-microservices-utils";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { API_RESPONSES } from "../constants/app.constant";
import GroceryItemService from "../services/groceryItem.service";

class GroceryItemController {
  GIService: GroceryItemService;

  constructor() {
    this.GIService = new GroceryItemService();
  }

  getAllGroceryItems = asyncHandler(async (req: Request, res: Response) => {
    const groceryItems = await this.GIService.getAllGroceryItems();

    res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          groceryItems,
          API_RESPONSES.GROCERY_ITEM_RETRIVE
        )
      );
  });

  addNewGroceryItem = asyncHandler(async (req: Request, res: Response) => {
    const groceryItem = await this.GIService.addNewGroceryItem(req);

    res
      .status(StatusCodes.CREATED)
      .json(
        new ApiResponse(
          StatusCodes.CREATED,
          groceryItem,
          API_RESPONSES.GROCERY_ITEM_CREATED
        )
      );
  });

  updateQuantityOfExistingItem = asyncHandler(
    async (req: Request, res: Response) => {
      const groceryItem = await this.GIService.updateQuantityOfExistingItem(
        req
      );

      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            groceryItem,
            API_RESPONSES.GROCERY_ITEM_UPDATED
          )
        );
    }
  );

  removeItemFromList = asyncHandler(async (req: Request, res: Response) => {
    const groceryItem = await this.GIService.removeItemFromList(req);

    res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          groceryItem,
          API_RESPONSES.GROCERY_ITEM_DELETED
        )
      );
  });
}

export default GroceryItemController;
