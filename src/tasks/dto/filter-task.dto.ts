import { IsOptional, IsEnum, IsDateString, IsString } from 'class-validator';
import { TaskStatus } from '../schemas/task.schema';

export class FilterTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
