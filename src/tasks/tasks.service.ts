import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tasks } from './tasks.model';
import { response } from 'express';
import { UpdateCheboxTaskDto } from './dto/update-checkbox-task.dto';

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
      if(!task) {
        throw new HttpException(
          'Tasks not found',
          HttpStatus.NOT_FOUND,
        )
      }
      return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskRepository.findByPk(id);
      const taskUpdate = await task.update(updateTaskDto);
      return taskUpdate;
    } catch(e) {
      return e.message;
    }
  }

  async updateAllCheckbox(updateCheboxTaskDto: UpdateCheboxTaskDto) {
    await this.taskRepository.update(
      {isChecked: updateCheboxTaskDto.isChecked},
      {where: {isChecked: !updateCheboxTaskDto.isChecked}, returning: true},
    );
    return 'OK';
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
