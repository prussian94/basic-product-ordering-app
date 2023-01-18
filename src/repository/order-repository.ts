import { OrderCreateRequest } from "./../models/request/OrderCreateRequest";
import { OrderModel } from "./../models/order/Order";
import config from "../config";
import mongoose from "mongoose";

const queryDefaults = { deleted: { $ne: true } };

export async function get(id: string) {
  return OrderModel.findOne({ ...queryDefaults, id });
}

export async function listForUser(userId: string, page: number) {
  return OrderModel.find({ ...queryDefaults, "user.id": userId })
    .limit(config.DEFAULT_PAGE_SIZE)
    .skip(config.DEFAULT_PAGE_SIZE * page)
    .sort({ id: -1 });
}

export async function create(order: OrderCreateRequest) {
  const bsonId = new mongoose.Types.ObjectId();
  return OrderModel.create({
    ...order,
    _id: bsonId,
    id: bsonId.toHexString(),
  });
}

export async function cancelOrder(id: string) {
  return OrderModel.updateOne({ id }, { $set: { isCancelled: true } });
}

export async function update(id: string, updateObj: any) {
  return OrderModel.updateOne({ id }, { $set: updateObj });
}
