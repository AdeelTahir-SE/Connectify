import { Module } from '@nestjs/common';
import { AgoraService } from './agora.service';
import { AgoraController } from './agora.controller';

@Module({
  controllers: [AgoraController],
  providers: [AgoraService],
})
export class AgoraModule {}
