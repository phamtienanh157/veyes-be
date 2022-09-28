import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, PostModule],
})
export class AppModule {}
