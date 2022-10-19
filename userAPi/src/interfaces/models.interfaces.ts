import { Model } from "../helpers/common/sqlize.helper";

export interface USER extends Model {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  randomString: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface AVATAR extends Model {
  id: number;
  picture: string;
  userId: number;
  toUserId: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}