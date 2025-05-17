import { PartialType } from '@nestjs/mapped-types';
import { CreateCotegoryeDto } from './create-cotegorye.dto';

export class UpdateCotegoryeDto extends PartialType(CreateCotegoryeDto) {}
