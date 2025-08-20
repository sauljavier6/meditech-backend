// @/models.ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import Product from "./Product";

@Table({ tableName: "ImagenProduct" })
export default class ImagenProduct extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare ID_ImagenProduct: number;

  //relacion tabla Product
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER, 
    allowNull: false,
  })
  declare ID_Product: number;
  
  @BelongsTo(() => Product)
  Product?: Product;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare ImagenUno: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare ImagenDos: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare ImagenTres: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare ImagenCuatro: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare ImagenCinco: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  })
  declare State: boolean;

}