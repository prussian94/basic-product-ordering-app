import { Currency } from "./../currency/Currency";
/* eslint-disable @typescript-eslint/no-var-requires */

import mongoose = require("mongoose");
const db = require("../../database-connection");

export type Product = {
  id: string;
  type: string;
  name: string;
  price: Currency;
  stock: number;
  deleted?: boolean;
};

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Object,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    deleted: {
      type: Boolean,
      required: false,
    },
  },
  { collection: "products" }
);

export const ProductModel = db.model("product", productSchema);
