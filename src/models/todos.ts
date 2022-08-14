import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Users } from './users';

@Table({
  timestamps: false,
  tableName: 'todos',
})
export class Todos extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  done!: boolean;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER })
  userId!: number;

  @BelongsTo(() => Users, 'userId')
  user!: Users;
}
