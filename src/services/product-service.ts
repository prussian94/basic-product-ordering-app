import { ProductCreateRequest } from "./../models/request/ProductCreateRequest";
import * as ProductRepository from "../repository/product-repository";

export async function get(id: string) {
  return await ProductRepository.get(id);
}

export async function list(page: number) {
  return await ProductRepository.list(page);
}

export async function create(product: ProductCreateRequest) {
  return await ProductRepository.create(product);
}

export async function deleteProduct(id: string) {
  return await ProductRepository.deleteProduct(id);
}

export async function update(id: string, updateObj: any) {
  return await ProductRepository.update(id, updateObj);
}
