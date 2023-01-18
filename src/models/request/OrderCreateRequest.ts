import { OrderedProducts } from "./../order/OrderedProducts";
import { Currency } from "./../currency/Currency";
import { User } from "./../user/User";
export type OrderCreateRequest = {
  user: User;
  time: number;
  products: OrderedProducts[];
};
