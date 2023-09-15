import express from "express";

import productsController from "../controllers/productsController.js";
import authenticateUser from "../middleware/authUser.js";

const productsRouter = express.Router();

productsRouter.get("/", authenticateUser, productsController.getAllProducts);

export default productsRouter;
