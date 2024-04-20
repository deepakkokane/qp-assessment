import { GroceryItem } from "@prisma/client";
import { ApiError } from "common-microservices-utils";
import { Request } from "express";
import {
  validationResult,
  Result,
} from "express-validator/src/validation-result";
import { StatusCodes } from "http-status-codes";
import { API_ERRORS } from "../constants/app.constant";
import GroceryItemRepository from "../repositories/groceryItem.repository";
import OrderRepository from "../repositories/order.repository";
import OrderItemRepository from "../repositories/orderItem.repository";

class OrderService {
  groceryItem: GroceryItemRepository;
  orderRepository: OrderRepository;
  orderItemRepository: OrderItemRepository;

  constructor() {
    this.groceryItem = new GroceryItemRepository();
    this.orderRepository = new OrderRepository();
    this.orderItemRepository = new OrderItemRepository();
  }

  createNewOrder = async (req: Request) => {
    const { items }: { items: Array<{ id: number; quantity: number }> } =
      req.body;

    const result: Result = validationResult(req);

    if (!result.isEmpty()) {
      throw new ApiError(StatusCodes.BAD_REQUEST, result.array()[0].msg);
    }

    if (!Array.isArray(items) || items.length === 0) {
      throw new ApiError(StatusCodes.BAD_REQUEST, API_ERRORS.ITEM_ARRAY_EMPTY);
    }

    try {
      for (const item of items) {
        const existingItem = await this.groceryItem.getById(item.id);
        if (!existingItem || existingItem.quantity < item.quantity) {
          throw new ApiError(
            StatusCodes.PARTIAL_CONTENT,
            API_ERRORS.INSUFFICIANT_QUANTITY
          );
        }
      }

      const order = await this.orderRepository.create({});

      if (!order)
        throw new ApiError(
          StatusCodes.CONFLICT,
          API_ERRORS.UNABLE_TO_CREATE_ORDER
        );

      const orderItems = await Promise.all(
        items.map((i) =>
          this.orderItemRepository.create({
            quantity: i.quantity,
            groceryItemId: i.id,
            orderId: order.id,
          })
        )
      );

      for (const item of items) {
        const existingItem = await this.groceryItem.getById(item.id);
        if (!existingItem) return;
        const updatedItem = await this.groceryItem.update(item.id, {
          quantity: existingItem.quantity - item.quantity,
        });
      }

      return order;
    } catch (error) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "INTERNAL_SERVER_ERROR"
      );
    }
  };
}

export default OrderService;
