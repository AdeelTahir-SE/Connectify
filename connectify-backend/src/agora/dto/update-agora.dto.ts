import { PartialType } from '@nestjs/mapped-types';
import { CreateAgoraDto } from './create-agora.dto';

export class UpdateAgoraDto extends PartialType(CreateAgoraDto) {}
