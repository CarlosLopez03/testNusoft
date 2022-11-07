import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('prueba - nusoft')
    .setDescription('Endpoints para la prueba técnica')
    .setVersion('test: 1.0')
    .addTag('Estudiantes')
    .addTag('Cursos')
    .addTag('CursosXEstudiantes')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
};
