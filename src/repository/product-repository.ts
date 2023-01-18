import { ProductCreateRequest } from "./../models/request/ProductCreateRequest";
import { ProductModel } from "../models/product/Product";
import config from "../config";
import mongoose from "mongoose";

const queryDefaults = { deleted: { $ne: true } };

export async function get(id: string) {
  return ProductModel.findOne({ ...queryDefaults, id });
}

export async function list(page: number) {
  return ProductModel.find({ ...queryDefaults })
    .limit(config.DEFAULT_PAGE_SIZE)
    .skip(config.DEFAULT_PAGE_SIZE * page)
    .sort({ id: -1 });
}

export async function create(product: ProductCreateRequest) {
  const bsonId = new mongoose.Types.ObjectId();
  return ProductModel.create({
    ...product,
    _id: bsonId,
    id: bsonId.toHexString(),
  });
}

export async function deleteProduct(id: string) {
  return ProductModel.updateOne({ id }, { $set: { deleted: true } });
}

export async function update(id: string, updateObj: any) {
  return ProductModel.updateOne({ id }, { $set: updateObj });
}

export async function listByIds(ids: string[]) {
  return ProductModel.find({ id: { $in: ids } });
}
