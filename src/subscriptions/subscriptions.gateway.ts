import { WebSocketGateway } from '@nestjs/websockets';
import { SubscriptionsService } from './subscriptions.service';

@WebSocketGateway()
export class SubscriptionsGateway {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}
}
