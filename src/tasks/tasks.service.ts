import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tasks } from './tasks.model';
import { UpdateCheboxTaskDto } from './dto/update-checkbox-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Tasks) private taskRepository: typeof Tasks) {}

  create(dto: CreateTaskDto) {
    try {
      return this.taskRepository.create(dto);
    } catch (e) {
      return e.message;
    }
  }

  findAll() {
    try {
      return this.taskRepository.findAll({order: [['id', 'ASC']]});
    } catch (e) {
      return e.message;
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskRepository.findByPk(id);
      const updateTask = task.update(updateTaskDto);
      const allTasks = await this.taskRepository.findAll({
        where: {isChecked: false}
      })
      if(allTasks.length === 0){
        this.updateAllCheckbox({isChecked: true});
      }
      return updateTask;
    } catch (e) {
      return e.message;
    }
  }

  updateAllCheckbox(updateCheboxTaskDto: UpdateCheboxTaskDto) {
    this.taskRepository.update(
      { isChecked: updateCheboxTaskDto.isChecked },
      { where: { isChecked: !updateCheboxTaskDto.isChecked }},
    );
    return 'OK';
  }

  async remove(id: number) {
    try {
      const task = await this.taskRepository.findByPk(id);
      task.destroy();
      return 'OK';
    } catch (e) {
      return e.message;
    }
  }

  removeAll() {
    try {
      this.taskRepository.destroy({
        where: { isChecked: true },
      });
      return 'OK';
    } catch (e) {
      return e.message;
    }
  }
}
