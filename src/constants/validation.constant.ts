import { Schema } from "express-validator";
export const createGrocerySchamaValidation: Schema = {
  name: {
    isEmpty: false,
    errorMessage: "Name should not be empty.",
  },
  quantity: {
    isInt: {
      errorMessage: "Quantity must be an positive integer.",
      options: { min: 1 }, // Ensures quantity is a positive integer
    },
  },
  price: {
    isInt: {
      errorMessage: "Price must be an positive integer.",
      options: { min: 1 },
    },
  },
};

export const updateGrocerySchemaValidation: Schema = {
  name: {
    optional: true,
    isEmpty: {
      negated: true,
      errorMessage: "Name should not be empty.",
    },
  },
  quantity: {
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "Quantity must be a positive integer.",
    },
  },
  price: {
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: "Price must be a positive number.",
    },
  },
};
