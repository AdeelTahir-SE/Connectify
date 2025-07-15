// src/agora/agora.service.ts
import { Injectable } from '@nestjs/common';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AgoraService {
  constructor(private configService: ConfigService) {}
  generateToken(channelName: string, uid:  string): string {
    const appId =this.configService.get<string>('AGORA_APP_ID') as string;
    const appCertificate =this.configService.get<string>('AGORA_APP_CERTIFICATE') as string;
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600; // 1 hour
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithAccount(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );

    return token;
  }
}
