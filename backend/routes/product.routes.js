import express from "express";
import { createProduct } from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

export default productRouter;