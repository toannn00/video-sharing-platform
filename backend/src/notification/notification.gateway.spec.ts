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

  it('should emit newVideoNotification event with the correct message', () => {
    const testMessage = 'Test Notification';
    const mockEmit = jest.fn();

    gateway.server = { emit: mockEmit };

    gateway.handleMessage(testMessage);

    expect(mockEmit).toHaveBeenCalledWith('newVideoNotification', testMessage);
  });
});
