import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Types } from 'mongoose';

// Dummy enum for TaskStatus
enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  // Create a valid MongoDB ObjectId for our tests.
  const validId = new Types.ObjectId().toHexString();

  // Create a mock TasksService that uses the enum for status
  const mockTasksService = {
    create: jest.fn((dto) => Promise.resolve({ _id: validId, ...dto })),
    findAll: jest.fn((filterDto) => Promise.resolve([])),
    findOne: jest.fn((id) =>
      Promise.resolve({
        _id: id,
        title: 'Test Task',
        description: 'Test description',
        status: TaskStatus.OPEN,
        dueDate: '20-8-2000',
      }),
    ),
    update: jest.fn((id, dto) => Promise.resolve({ _id: id, ...dto })),
    remove: jest.fn((id) =>
      Promise.resolve({ message: 'Task deleted successfully' }),
    ),
  };

  // Create a dummy JwtAuthGuard that always returns true
  const mockJwtAuthGuard = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockTasksService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call tasksService.create and return a new task', async () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test description',
        status: TaskStatus.OPEN,
        dueDate: '20-8-2000',
      };
      const result = await controller.create(createTaskDto);
      expect(service.create).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual({ _id: validId, ...createTaskDto });
    });
  });

  describe('findAll', () => {
    it('should call tasksService.findAll and return an array of tasks', async () => {
      const filterTaskDto = { status: TaskStatus.OPEN };
      const result = await controller.findAll(filterTaskDto);
      expect(service.findAll).toHaveBeenCalledWith(filterTaskDto);
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should call tasksService.findOne and return a task', async () => {
      const result = await controller.findOne(validId);
      expect(service.findOne).toHaveBeenCalledWith(validId);
      expect(result).toEqual({
        _id: validId,
        title: 'Test Task',
        description: 'Test description',
        status: TaskStatus.OPEN,
        dueDate: '20-8-2000',
      });
    });
  });

  describe('update', () => {
    it('should call tasksService.update and return an updated task', async () => {
      const updateTaskDto = { title: 'Updated Task' };
      const result = await controller.update(validId, updateTaskDto);
      expect(service.update).toHaveBeenCalledWith(validId, updateTaskDto);
      expect(result).toEqual({ _id: validId, ...updateTaskDto });
    });
  });

  describe('remove', () => {
    it('should call tasksService.remove and return a success message', async () => {
      const result = await controller.remove(validId);
      expect(service.remove).toHaveBeenCalledWith(validId);
      expect(result).toEqual({ message: 'Task deleted successfully' });
    });
  });
});
