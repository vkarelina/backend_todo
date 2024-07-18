import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @Length(1, 254, { message: 'No less than 1 character and no more than 256' })
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty({ message: 'Field must is not empty' })
  readonly text: string;
}
