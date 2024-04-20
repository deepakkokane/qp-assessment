import { Prisma } from "@prisma/client";
import prisma from "../config/prisma.config";

export type createGroceryItemType = Prisma.Args<
  typeof prisma.groceryItem,
  "create"
>["data"];

export type updateGroceryItemType = Prisma.Args<
  typeof prisma.groceryItem,
  "update"
>["data"];

export type createOrderType = Prisma.Args<
  typeof prisma.order,
  "create"
>["data"];

export type updateOrderType = Prisma.Args<
  typeof prisma.order,
  "update"
>["data"];

export type createOrderItemType = Prisma.Args<
  typeof prisma.orderItem,
  "create"
>["data"];

export type updateOrderItemType = Prisma.Args<
  typeof prisma.orderItem,
  "update"
>["data"];
