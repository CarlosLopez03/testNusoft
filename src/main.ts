import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const logger = new Logger();

  initSwagger(app);

  await app.listen(3000);
  logger.log(`Servidor inicializado en: ${await app.getUrl()}`);
}
bootstrap();
