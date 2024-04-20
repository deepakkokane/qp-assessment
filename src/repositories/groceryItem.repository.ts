import prisma from "../config/prisma.config";
import {
  createGroceryItemType,
  updateGroceryItemType,
} from "../types/schema.type";
import { queryHandler } from "../utils/helper";

class GroceryItemRepository {
  create = async (data: createGroceryItemType) => {
    return queryHandler(async () => await prisma.groceryItem.create({ data }));
  };

  getAll = async () => {
    return queryHandler(async () => await prisma.groceryItem.findMany());
  };

  getById = async (id: number) => {
    return queryHandler(
      async () => await prisma.groceryItem.findUnique({ where: { id } })
    );
  };

  update = async (id: number, data: updateGroceryItemType) => {
    return await prisma.groceryItem.update({ where: { id }, data });
  };

  delete = async (id: number) => {
    return queryHandler(
      async () => await prisma.groceryItem.delete({ where: { id } })
    );
  };
}

export default GroceryItemRepository;
