import { Column, Model, Table, DataType, Length, Min, AllowNull } from "sequelize-typescript";


@Table({ tableName: "purchases", timestamps: true })
export default class Purchases extends Model<Purchases, IPurchasesAttrs> {
    @Column({
        type: DataType.INTEGER,
    })
    user_id!: number;

    @AllowNull(false)
    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
        defaultValue: [],
    })
    basket!: number[];
}
