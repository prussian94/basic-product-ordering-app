/* eslint-disable @typescript-eslint/no-var-requires */

import mongoose = require("mongoose");
const db = require("../database-connection");

export type Token = {
  id: string;
  score: number;
  value: string;
  expireTime: number;
};

const tokenSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    expireTime: {
      type: Number,
      required: true,
    },
  },
  { collection: "tokens" }
);

export const TokenModel = db.model("token", tokenSchema);
