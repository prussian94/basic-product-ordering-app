import { User } from "../models/user/User";

export default function isValidUser(user: any): user is User {
  return (
    user.username !== undefined &&
    user.id !== undefined &&
    user.photoUrl !== undefined
  );
}
