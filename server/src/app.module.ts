import { Module } from '@nestjs/common';
import { SharedModule } from './shared/Shared.module';
import { CoreModule } from './modules/Core.module';

@Module({
  imports: [SharedModule, CoreModule],
})
export class AppModule {}
