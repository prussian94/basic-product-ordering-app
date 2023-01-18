import { Currency } from "./../currency/Currency";
export type ProductCreateRequest = {
  type: string;
  name: string;
  price: Currency;
  stock: number;
};
