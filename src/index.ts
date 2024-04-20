import Express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { ApiError, errorHandler } from "common-microservices-utils";
import cors from "cors";
import { API_ENDPOINTS } from "./constants/app.constant";

import adminRoutes from "./routes/admin.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = Express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(API_ENDPOINTS.BASE + API_ENDPOINTS.ADMIN, adminRoutes);
app.use(API_ENDPOINTS.BASE + API_ENDPOINTS.USER, userRoutes);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  return errorHandler(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
