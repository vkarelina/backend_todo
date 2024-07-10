import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tasks } from './tasks.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Tasks) private taskRepository: typeof Tasks) {}

  async create(dto: CreateTaskDto) {
    const task = await this.taskRepository.create(dto);
    return task;
  }

  async findAll() {
    const tasks = await this.taskRepository.findAll();
    return tasks;
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findByPk(id);
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findByPk(id);
    const taskUpdate = await task.update(updateTaskDto);
    return taskUpdate;
  }

  async remove(id: number) {
    try {
      const task = await this.taskRepository.findByPk(id);
      await task.destroy();
      return 'Successfully';
    } catch (e) {
      return e.message;
    }
  }
}
