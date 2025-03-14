import { Column, Model, Table, DataType, Length, Min, AllowNull } from "sequelize-typescript";


@Table({ tableName: "products", timestamps: true })
export default class Product extends Model<Product, IProductAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @AllowNull(false)
  @Length({ min: 3, max: 255 })
  @Column({
    type: DataType.STRING,
  })
  market_hash_name!: string;

  @AllowNull(false)
  @Min(0) 
  @Column({
    type: DataType.FLOAT,
  })
  min_tradable_price!: number;

  @AllowNull(false)
  @Min(0)
  @Column({
    type: DataType.FLOAT,
  })
  min_no_tradable_price!: number;
}
