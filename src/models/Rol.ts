// @/models.ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, HasMany } from "sequelize-typescript";
import User from "./User";

@Table({ tableName: "Rol" })
export default class Rol extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  ID_Rol!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Description!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  })
  State!: boolean;

  @HasMany(() => User)
  user?: User[];
}