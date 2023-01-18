import { Currency } from "./../currency/Currency";
import { User } from "./../user/User";
import { OrderedProducts } from "./OrderedProducts";
/* eslint-disable @typescript-eslint/no-var-requires */

import mongoose = require("mongoose");
const db = require("../../database-connection");

export type Order = {
  id: string;
  user: User;
  time: number;
  products: OrderedProducts[];
  isCancelled?: boolean;
};

const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    products: {
      type: [Object],
      required: true,
    },
    isCancelled: {
      type: Boolean,
      required: false,
    },
  },
  { collection: "orders" }
);

export const OrderModel = db.model("order", orderSchema);
