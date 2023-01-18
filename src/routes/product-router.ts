import { ProductCreateRequest } from "./../models/request/ProductCreateRequest";
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { CustomRequest } from "../models/request/custom-request";
import { NextFunction, Response } from "express";
/* eslint-disable @typescript-eslint/no-var-requires */
import { authMiddleware } from "../helpers/auth-helper";
import * as ProductService from "../services/product-service";
import isValidProductCreateRequest from "../validators/product-validator";
import exceptions from "../exceptions/exceptions";

const express = require("express");
const router = express.Router();
const routeHandler = require("../helpers/route-helper");

router.get("/:id", authMiddleware(), routeHandler(get));
router.get("/", authMiddleware(), routeHandler(list));
router.post("/", authMiddleware(), routeHandler(create));
router.delete("/:id", authMiddleware(), routeHandler(deleteProduct));
router.put("/:id", authMiddleware(), routeHandler(update));

async function get(req: CustomRequest, res: Response, next: NextFunction) {
  const id = req.params.id;

  const product = await ProductService.get(id);

  return product;
}

async function list(req: CustomRequest, res: Response, next: NextFunction) {
  const page = Number(req.query.page) || 1;
  const products = await ProductService.list(page - 1);

  return products;
}

async function create(req: CustomRequest, res: Response, next: NextFunction) {
  const product = req.body;
  if (!isValidProductCreateRequest(product)) {
    return exceptions.invalidRequest;
  }

  const createdProduct = await ProductService.create(
    product as ProductCreateRequest
  );

  return createdProduct;
}

async function deleteProduct(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  const deletedProduct = await ProductService.deleteProduct(id);

  return deletedProduct;
}

async function update(req: CustomRequest, res: Response, next: NextFunction) {
  const id = req.params.id;
  const updateObj = req.body;

  const updatedProduct = await ProductService.update(id, updateObj);

  return updatedProduct;
}

module.exports = router;
