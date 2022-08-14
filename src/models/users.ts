import { Table, Model, Column, DataType, IsEmail, HasMany } from 'sequelize-typescript';
import { Todos } from './todos';

@Table({
  timestamps: false,
  tableName: 'users',
})
export class Users extends Model {
  @IsEmail
  @Column({ type: DataType.STRING, allowNull: false })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @HasMany(() => Todos)
  todos!: Todos[];
}
