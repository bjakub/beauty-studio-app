import { Module } from '@nestjs/common';
import { GlobalModule } from './global/Global.module';
import { CoreModule } from './modules/Core.module';

@Module({
  imports: [GlobalModule, CoreModule],
})
export class AppModule {}
