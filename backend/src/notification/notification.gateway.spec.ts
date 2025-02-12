import { Test, TestingModule } from '@nestjs/testing';
import { NotificationGateway } from './notification.gateway';

describe('NotificationGateway', () => {
  let gateway: NotificationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationGateway],
    }).compile();

    gateway = module.get<NotificationGateway>(NotificationGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should emit newVideoNotification event with the correct notification data', () => {
    const testNotification = {
      title: 'Test Video',
      email: 'test@example.com',
    };
    const mockEmit = jest.fn();

    gateway.server = { emit: mockEmit };

    gateway.handleMessage(testNotification);

    expect(mockEmit).toHaveBeenCalledWith(
      'newVideoNotification',
      testNotification,
    );
  });
});
