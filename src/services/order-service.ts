import { Order } from "./../models/order/Order";
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Product } from "./../models/product/Product";
import { sendOrderAfter1MinuteDelay } from "./../gateways/IntegrationServiceGateway";
import { OrderCreateRequest } from "./../models/request/OrderCreateRequest";
import * as OrderRepository from "../repository/order-repository";
import * as ProductRepository from "../repository/product-repository";
import exceptions from "../exceptions/exceptions";

export async function get(id: string) {
  return await OrderRepository.get(id);
}

export async function listForUser(userId: string, page: number) {
  return await OrderRepository.listForUser(userId, page);
}

async function validateOrder(order: OrderCreateRequest) {
  const productIds = order.products.map((p) => p.id);
  const products = await ProductRepository.listByIds(productIds);
  let isValid = true;
  products.forEach((product: Product) => {
    console.log("product :>> ", product);
    const orderProduct = order.products.find((p) => p.id === product.id);
    if (!orderProduct) {
      isValid = false;
    }
    const count = orderProduct?.count || Number.MAX_SAFE_INTEGER;
    if (count > product.stock) {
      isValid = false;
    }
  });
  return isValid;
}

async function postOrderActions(order: Order) {
  await sendOrderAfter1MinuteDelay(order);
  order.products.forEach(async (product) => {
    const productToUpdate = await ProductRepository.get(product.id);
    if (productToUpdate) {
      await ProductRepository.update(product.id, {
        stock: productToUpdate.stock - product.count,
      });
    }
  });
}

export async function create(order: OrderCreateRequest) {
  const isValid = await validateOrder(order);
  if (isValid) {
    const createdOrder = await OrderRepository.create(order);
    await postOrderActions(createdOrder);
    return createdOrder;
  }

  return exceptions.exceedingStock;
}

export async function cancelOrder(id: string) {
  return await OrderRepository.cancelOrder(id);
}

export async function update(id: string, updateObj: any) {
  return await OrderRepository.update(id, updateObj);
}
