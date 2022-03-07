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

async function bootstrap() {
  const app: NestFastifyApplication =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(
          {bodyLimit: 104857600} //100 MB
        ),
      {
        cors: true, // Enable CORS
        
      },
    );
  const configService = app.get(ConfigService);
  const PORT: number = configService.get<number>('API_PORT', 3000);
  const BASE_PATH: string = configService.get<string>(
    'API_BASE_PATH',
    'api',
  );
  const SWAGGER_PATH: string = configService.get<string>(
    'API_SWAGGER_PATH',
    'openapi',
  );

  app.setGlobalPrefix(BASE_PATH);
  // app.useGlobalFilters(new NotFoundExceptionFastifyFilter());
 
  const swaggerConfig = new DocumentBuilder()
    .setTitle('WCC API')
    .setDescription('WCC API and Microservices')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'HasBearer')
    .build();
  const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );
  SwaggerModule.setup(SWAGGER_PATH, app, swaggerDocument);

  app.enableShutdownHooks();

  await app.listen(PORT);
  logger.log(`API Gateway Listening at PORT: ${PORT}`);
}
bootstrap();
