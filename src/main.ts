import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORs
  app.enableCors({
    origin: '*',
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Exception handler
  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('PM API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT, () =>
    Logger.log('Server running on port ' + process.env.PORT, 'Bootstrap'),
  );
}
bootstrap();
