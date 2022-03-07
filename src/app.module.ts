import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Announcement, Job, JobProfile, Profile } from 'commons/commons';
import { AccountModule } from './account/account.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [    
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_DATABASE_HOST', 'localhost'),
        port: +configService.get<number>('MYSQL_DATABASE_PORT'),
        username: configService.get<string>('MYSQL_DATABASE_USER'),
        password: configService.get<string>('MYSQL_DATABASE_PASSWORD',),
        database: configService.get<string>('MYSQL_DATABASE_NAME', 'hrdb'),
        entities: [
          Account, Profile, Announcement, Job, JobProfile
        ],
        synchronize: false,
        logging: true,        
        autoLoadEntities: true
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AnnouncementModule,
    AccountModule,
    JobModule,
    JwtModule.register({
      secret : 'strygwyKey',
      signOptions : {expiresIn : '12h'}
    })    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
