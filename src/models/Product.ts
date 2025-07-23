// @/models.ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import Stock from "./Stock";
import Category from "./Category";
import ProductSale from "./SaleProduct";

@Table({ tableName: "Product" })
export default class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare ID_Product: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare Description: string;

  //relacion tabla category
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare ID_Category: number;

  @BelongsTo(() => Category)
  Category?: Category;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare Code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare Imagen: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  })
  declare State: boolean;

  
  //relación con tabla stock
  @HasMany(() => Stock)
  Stock?: Stock[];

  @HasMany(() => ProductSale)
  ProductSales?: ProductSale[];
}