import { OrderCreateRequest } from "./../models/request/OrderCreateRequest";

export default function isValidOrderCreateRequest(
  order: any
): order is OrderCreateRequest {
  return (
    order.user !== undefined &&
    order.time !== undefined &&
    order.products !== undefined
  );
}
