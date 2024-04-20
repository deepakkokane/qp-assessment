import prisma from "../config/prisma.config";
import { createOrderType, updateOrderType } from "../types/schema.type";
import { queryHandler } from "../utils/helper";

class OrderRepository {
  create = async (data: createOrderType) => {
    return queryHandler(async () => await prisma.order.create({ data }));
  };

  getAll = async () => {
    return queryHandler(async () => await prisma.order.findMany());
  };

  getById = async (id: number) => {
    return queryHandler(
      async () => await prisma.order.findUnique({ where: { id } })
    );
  };

  update = async (id: number, data: updateOrderType) => {
    return await prisma.order.update({ where: { id }, data });
  };

  delete = async (id: number) => {
    return queryHandler(
      async () => await prisma.order.delete({ where: { id } })
    );
  };
}

export default OrderRepository;
