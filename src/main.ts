import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Clara Araujo","https://github.com/claramamute","claraflor22@outlook.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00'// Variável de ambiente , horário de Brasilia (necessário para não gravar a hora errada, na hora de usar data e hora)
  app.useGlobalPipes(new ValidationPipe()) // Habilitar a validação de dados (regras para validar dados) para todas as requisições das entidades
  app.enableCors() // Habilita para o front conversar com o back (requisições de servidores diferentes) cross origin resource sharing
  await app.listen(process.env.PORT || 4000); //mudar porta para 4000
}
bootstrap(); //funcao que sobe a aplicação 
