import { Module } from '@nestjs/common';
import { CotegoryesService } from './cotegoryes.service';
import { CotegoryesController } from './cotegoryes.controller';

@Module({
  controllers: [CotegoryesController],
  providers: [CotegoryesService],
})
export class CotegoryesModule {}
