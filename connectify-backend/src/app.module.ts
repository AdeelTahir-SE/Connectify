import { MiddlewareConsumer, Module,  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestModule } from '@nestjs/common';
import { WebSocket } from './app.gateway';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PaymentModule } from './payment/payment.module';
import { AgoraModule } from './agora/agora.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CloudinaryModule, PaymentModule, AgoraModule, ConfigModule.forRoot({
      isGlobal: true,
    })],
  controllers: [AppController],
  providers: [AppService,WebSocket],
})
export class AppModule implements NestModule {
configure(consumer: MiddlewareConsumer) {
    consumer.apply();
    consumer.apply()
}
}
