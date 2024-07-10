import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

interface TasksCreactionAttrs {
  text: string;
}

@Table({ tableName: 'tasks' })
export class Tasks extends Model<Tasks, TasksCreactionAttrs> {
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  onChecked: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
