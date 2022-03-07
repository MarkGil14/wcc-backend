import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {   PassportModule } from '@nestjs/passport';
import { Account, Announcement, Job, JobProfile, JwtStrategy, Profile } from 'commons/commons';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'commons/commons/guard/jwt-guard';

@Module({
  imports : [
    // ConfigModule.forRoot({
    //   expandVariables: true,
    //   isGlobal: true,
    // }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get<string>('MYSQL_DATABASE_HOST', 'localhost'),
    //     port: +configService.get<number>('MYSQL_DATABASE_PORT'),
    //     username: configService.get<string>('MYSQL_DATABASE_USER'),
    //     password: configService.get<string>('MYSQL_DATABASE_PASSWORD',),
    //     database: configService.get<string>('MYSQL_DATABASE_NAME', 'hrdb'),
    //     entities: [
    //       Account, Profile, Announcement, Job
    //     ],
    //     synchronize: false,
    //     logging: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forFeature([
      Account,
      Profile,
      JobProfile,
    ]),  

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const JWT_SECRET = configService.get<string>(
          'API_SECRET_TOKEN',
          'Jwt_SECRET_NotSet',
        );
        return {
          secret: JWT_SECRET,
          signOptions: { expiresIn: '12h' },
        };
      },
      inject: [ConfigService],
    }),
    HttpModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy, 
  ],
   
})
export class AuthModule {}
