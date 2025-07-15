import { Test, TestingModule } from '@nestjs/testing';
import { AgoraService } from './agora.service';

describe('AgoraService', () => {
  let service: AgoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgoraService],
    }).compile();

    service = module.get<AgoraService>(AgoraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
