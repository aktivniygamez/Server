import { Column, Model, Table, DataType, Length, Min, AllowNull } from "sequelize-typescript";

@Table({ tableName: "users", timestamps: true })
export default class User extends Model<User, IUserAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @AllowNull(false)
  @Length({ min: 3, max: 50 })
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Length({ min: 6 })
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Min(0)
  @Column(DataType.FLOAT)
  balance!: number;
}
