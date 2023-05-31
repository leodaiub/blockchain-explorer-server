import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsGateway } from './subscriptions.gateway';
import { SubscriptionsService } from './subscriptions.service';

describe('SubscriptionsGateway', () => {
  let gateway: SubscriptionsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionsGateway, SubscriptionsService],
    }).compile();

    gateway = module.get<SubscriptionsGateway>(SubscriptionsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
