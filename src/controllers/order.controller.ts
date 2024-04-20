import { ApiResponse, asyncHandler } from "common-microservices-utils";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { API_RESPONSES } from "../constants/app.constant";

import OrderService from "../services/order.service";

class OrderController {
  orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  createNewOrder = asyncHandler(async (req: Request, res: Response) => {
    const order = await this.orderService.createNewOrder(req);

    res
      .status(StatusCodes.CREATED)
      .json(
        new ApiResponse(StatusCodes.CREATED, order, API_RESPONSES.ORDER_CREATED)
      );
  });
}

export default OrderController;
