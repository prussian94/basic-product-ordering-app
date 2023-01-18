import { ProductCreateRequest } from "./../models/request/ProductCreateRequest";

export default function isValidProductCreateRequest(
  product: any
): product is ProductCreateRequest {
  return (
    product.type !== undefined &&
    product.name !== undefined &&
    product.price !== undefined &&
    product.stock !== undefined
  );
}
