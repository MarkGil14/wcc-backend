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
import { StudentModule } from './student/student.module';

@Module({
  imports: [    
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        // url : configService.get<string>('DATABASE_URL', 'postgres://obrtzzvtaonqub:a282bceff0c8bed1455847fcab5598fd2a3cdeb6672f021f46510720940553a8@ec2-52-5-110-35.compute-1.amazonaws.com:5432/d64u7ioj3uqffa'),
        // type: 'postgres',
        type : 'mysql',
        // ssl: {
        //   rejectUnauthorized: false,
        // },
        host: configService.get<string>('MYSQL_DATABASE_HOST', 'localhost'),
        port: +configService.get<number>('MYSQL_DATABASE_PORT'),
        username: configService.get<string>('MYSQL_DATABASE_USER'),
        password: configService.get<string>('MYSQL_DATABASE_PASSWORD',),
        database: configService.get<string>('MYSQL_DATABASE_NAME', 'hrdb'),
        entities: [
          Account, Profile, Announcement, Job, JobProfile
        ],
        autoLoadEntities: true,
        synchronize: false,
        // synchronize: false,
        logging: true,        
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
    }),
    StudentModule    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
