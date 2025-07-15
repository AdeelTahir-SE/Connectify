// src/agora/agora.controller.ts
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AgoraService } from './agora.service';

@Controller('agora')
export class AgoraController {
  constructor(private readonly agoraService: AgoraService) {}

  @Get('token')
  getToken(@Query('channelName') channelName: string, @Query('uid') uid: string) {
    if (!channelName || !uid) {
      throw new BadRequestException('Missing channelName or uid');
    }

    const token = this.agoraService.generateToken(channelName, uid);
    return { token };
  }
}
