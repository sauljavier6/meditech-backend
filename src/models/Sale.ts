// @/models.ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import State from "./State";
import Payment from "./Payment";
import PaymentSale from "./PaymentSale";
import ProductSale from "./SaleProduct";

@Table({ tableName: "Sale" })
export default class Sale extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare ID_Sale: number;

  //relacion tabla category
  //@ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare ID_User: number;

  //@BelongsTo(() => User)
  //User?: User;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare Total: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare Balance_Total: number;


  //relacion tabla estado venta
  @ForeignKey(() => State)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare ID_State: number;

  @BelongsTo(() => State)
  State?: State;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare ID_Operador: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare Batch: string;

  @HasMany(() => PaymentSale)
  PaymentSale?: PaymentSale[];

  @HasMany(() => ProductSale)
  ProductSales?: ProductSale[];
}