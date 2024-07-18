import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tasks } from './tasks.model';
import { UpdateCheboxTaskDto } from './dto/update-checkbox-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Tasks) private taskRepository: typeof Tasks) { }

  async create(dto: CreateTaskDto) {
    const task = await this.taskRepository.create(dto);

    if (!task) {
      throw new NotFoundException('Error: Not found todo');
    }

    return task;
  }

  async findAll() {
      const tasks = await this.taskRepository.findAll({
        order: [['id', 'ASC']],
      });

      if(!tasks) {
        throw new NotFoundException('Error: Not found todos');
      }

      return tasks;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
      const task = await this.taskRepository.findByPk(id);

      if(!task) {
        throw new NotFoundException('Error: Not found todo');
      }
      
      const updateTask = task.update(updateTaskDto);
      return updateTask;
  }

  async updateAllCheckbox(updateCheboxTaskDto: UpdateCheboxTaskDto) {
    const task = await this.taskRepository.update(
      { isChecked: updateCheboxTaskDto.isChecked },
      { where: { isChecked: !updateCheboxTaskDto.isChecked } },
    );

    if(!task) {
      throw new NotFoundException('Error: Not found todo for update');
    }
    
    return { success: 'OK' };
  }

  async remove(id: number) {
      const task = await this.taskRepository.findByPk(id);

      if(!task) {
        throw new NotFoundException('Error: Not found todo');
      }

      task.destroy();
      return { success: 'OK' };
  }

  async removeAll() {
      const tasks = await this.taskRepository.destroy({
        where: { isChecked: true },
      });

      if(!tasks) {
        throw new NotFoundException('Error: Not found todos');
      }

      return { success: 'OK' };
  }
}
