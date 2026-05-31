import { NestFactory } from '@nestjs/core';

import {
  ValidationPipe,
} from '@nestjs/common';

import {
  ConfigService,
} from '@nestjs/config';

import helmet from 'helmet';

import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app =
    await NestFactory.create(
      AppModule,
    );

  const configService =
    app.get(ConfigService);

  const allowedOrigins =
    configService
      .get<string>(
        'FRONTEND_URL',
        '',
      )
      .split(',')
      .map((origin) =>
        origin.trim(),
      )
      .filter(Boolean);

  app.enableCors({
    origin: (
      origin,
      callback,
    ) => {
      // Postman, Swagger, Server-to-Server
      if (!origin) {
        return callback(
          null,
          true,
        );
      }

      if (
        allowedOrigins.includes(
          origin,
        )
      ) {
        return callback(
          null,
          true,
        );
      }

      return callback(
        new Error(
          `Origin ${origin} not allowed by CORS`,
        ),
        false,
      );
    },

    credentials: true,
  });

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config =
    new DocumentBuilder()
      .setTitle(
        'CoreITBox API',
      )
      .setDescription(
        'CoreITBox Ticketing System API Documentation',
      )
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();

  const document =
    SwaggerModule.createDocument(
      app,
      config,
    );

  SwaggerModule.setup(
    'api',
    app,
    document,
  );

  const port =
    configService.get<number>(
      'PORT',
      3100,
    );

  await app.listen(
    port,
    '0.0.0.0',
  );

  console.log(
    `🚀 CoreITBox Backend running on port ${port}`,
  );

  console.log(
    `🌐 Allowed Origins: ${allowedOrigins.join(
      ', ',
    )}`,
  );

  console.log(
    '📚 Swagger: /api',
  );
}

bootstrap();