import isValidUser from "../validators/user-validator";
import exceptions from "../exceptions/exceptions";

export function verifyDetailedUser(userData: any) {
  if (!isValidUser(userData)) throw exceptions.userNotFound;
  return userData;
}
