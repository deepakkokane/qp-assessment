export const API_ENDPOINTS = {
  GROCERY_ITEM: "/items",
  GROCERY_ITEM_ID: "/item/:id",
  BASE: "/api",
  ADMIN: "/admin",
  USER: "/user",
  ORDER: "/order",
};

export const API_RESPONSES = {
  GROCERY_ITEM_RETRIVE: "Successfully retrieved all grocery items",
  GROCERY_ITEM_CREATED: "Grocery item created successfully.",
  GROCERY_ITEM_UPDATED: "Grocery item updated successfully.",
  GROCERY_ITEM_DELETED: "Grocery item deleted successfully.",

  ORDER_CREATED: "Order created successfully.",
};

export const API_ERRORS = {
  ROUTE_NOT_FOUND: "Route not found",
  DATABASE_ERROR: "Database error",
  ITEM_NOT_FOUND_WITH_ID: "No item found with given Id.",

  UNABLE_TO_CREATE_GROCERY_ITEM: "Unable to create gorcery item.",
  INSUFFICIANT_QUANTITY:
    "One or more items are not available in sufficient quantity",
  UNABLE_TO_CREATE_ORDER: "Unable to create order",

  ITEM_ARRAY_EMPTY: "Items array is empty or missing",
};
