import { IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { TaskStatus } from '../schemas/task.schema';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus, {
    message: 'Status must be either OPEN, IN_PROGRESS, or DONE.',
  })
  status: TaskStatus;

  @IsNotEmpty()
  // @IsDateString()
  dueDate: string;
}
