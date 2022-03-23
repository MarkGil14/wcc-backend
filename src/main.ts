import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
const logger: Logger = new Logger('testarossa-api-gateway');
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const PORT = +(configService.get('PORT') || 3100);

  // enable trust proxy
  app.set('trust proxy', 1);

  // app.use(helmet());
  app.enableCors();
  // app.use(cookieParser());
  // app.use(csurf({ cookie: true }));

  app.use(bodyParser.text({ defaultCharset: 'utf8' }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // app.useStaticAssets(join(__dirname, '..', 'public'), {
  //     index: false,
  //     prefix: '/public',
  // });

  // const options = new DocumentBuilder()
  //   .setTitle('Logistics API')
  //   .setDescription('CloudQwest Logistics API')
  //   .setVersion('1.0')
  //   .build();

  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api-cq/openapi/swagger', app, document);

  await app.listen(PORT);
  logger.log(
    `API-GATEWAY [${process.pid}] Worker Started and running in PORT: ${PORT}`,
  );


}
bootstrap();
