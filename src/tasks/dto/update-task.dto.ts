import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @Length(1, 254, { message: 'No less than 1 character and no more than 256' })
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty({ message: 'Field must is not empty' })
  @IsOptional()
  text?: string;

  @IsBoolean({ message: 'Must be a boolean' })
  @IsOptional()
  isChecked?: boolean;
}
