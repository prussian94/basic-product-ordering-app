import { TokenModel } from "./../models/Token";

const queryDefaults = { deleted: { $ne: true } };

export async function get(value: string) {
  return await TokenModel.findOne({ ...queryDefaults, value });
}
