import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateCheboxTaskDto {
  @IsBoolean({ message: 'Must be a boolean' })
  @IsNotEmpty({ message: 'Field must is not empty' })
  isChecked: boolean;
}
