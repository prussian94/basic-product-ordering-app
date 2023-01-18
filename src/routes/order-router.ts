import { OrderCreateRequest } from "./../models/request/OrderCreateRequest";
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { CustomRequest } from "../models/request/custom-request";
import { NextFunction, Response } from "express";
/* eslint-disable @typescript-eslint/no-var-requires */
import { authMiddleware } from "../helpers/auth-helper";
import * as OrderService from "../services/order-service";
import exceptions from "../exceptions/exceptions";
import isValidOrderCreateRequest from "../validators/order-validator";

const express = require("express");
const router = express.Router();
const routeHandler = require("../helpers/route-helper");

router.get("/:id", authMiddleware(), routeHandler(get));
router.get("/user/:userId", authMiddleware(), routeHandler(listForUser));
router.post("/", authMiddleware(), routeHandler(create));
router.put("/cancel/:id", authMiddleware(), routeHandler(cancelOrder));
router.put("/:id", authMiddleware(), routeHandler(update));
router.put(
  "/:id/postpone/:time",
  authMiddleware(),
  routeHandler(postponeOrder)
);

async function get(req: CustomRequest, res: Response, next: NextFunction) {
  const id = req.params.id;

  const order = await OrderService.get(id);

  return order;
}

async function listForUser(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const page = Number(req.query.page) || 1;
  const userId = req.params.userId;
  const orders = await OrderService.listForUser(userId, page - 1);

  return orders;
}

async function create(req: CustomRequest, res: Response, next: NextFunction) {
  const order = req.body;
  if (!isValidOrderCreateRequest(order)) {
    return exceptions.invalidRequest;
  }

  const createdOrder = await OrderService.create(order as OrderCreateRequest);

  return createdOrder;
}

async function cancelOrder(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  const cancelledOrder = await OrderService.cancelOrder(id);

  return cancelledOrder;
}

async function update(req: CustomRequest, res: Response, next: NextFunction) {
  const id = req.params.id;
  const updateObj = req.body;

  const updatedOrder = await OrderService.update(id, updateObj);

  return updatedOrder;
}

async function postponeOrder(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const time = Number(req.params.time);

  const updatedOrder = await OrderService.update(id, { time });

  return updatedOrder;
}

module.exports = router;
