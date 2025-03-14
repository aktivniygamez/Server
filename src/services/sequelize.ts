import { Sequelize } from "sequelize-typescript";
import User from "../users/users.model";
import Product from "../products/products.model";
import Purchases from "../purchases/purchases.model";

declare module "fastify" {
  interface Session {
      user?: { id: number; name: string };
  }
}

const sequelize = new Sequelize({
  database: "nest1",
  dialect: "postgres",
  username: "postgres",
  password: "root",
  models: [User, Product, Purchases],
});

export default sequelize;
