import prisma from "../config/prisma.config";
import {
  createOrderItemType,
  createOrderType,
  updateOrderItemType,
  updateOrderType,
} from "../types/schema.type";
import { queryHandler } from "../utils/helper";

class OrderItemRepository {
  create = async (data: createOrderItemType) => {
    return queryHandler(async () => await prisma.orderItem.create({ data }));
  };

  getAll = async () => {
    return queryHandler(async () => await prisma.orderItem.findMany());
  };

  getById = async (id: number) => {
    return queryHandler(
      async () => await prisma.orderItem.findUnique({ where: { id } })
    );
  };

  update = async (id: number, data: updateOrderItemType) => {
    return await prisma.orderItem.update({ where: { id }, data });
  };

  delete = async (id: number) => {
    return queryHandler(
      async () => await prisma.orderItem.delete({ where: { id } })
    );
  };
}

export default OrderItemRepository;
