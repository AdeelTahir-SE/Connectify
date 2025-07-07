import { MiddlewareConsumer, Module,  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestModule } from '@nestjs/common';
import { WebSocket } from './app.gateway';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,WebSocket],
})
export class AppModule implements NestModule {
configure(consumer: MiddlewareConsumer) {
    consumer.apply();
    consumer.apply()
}
}
