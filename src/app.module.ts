import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';

@Module({
  imports: [  // Criar a conexão com banco de dados
    TypeOrmModule.forRoot({ // Objeto ==> Entidades (tabelas) para todo o projeto
      type: 'mysql', // tipo do banco 
      host: 'localhost', // endereço do banco
      port: 3306, // porta 
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal', // qual db
      entities: [Postagem], // vetor de registro de tabelas criadas
      synchronize: true, // sincronização do typeORM com tabelas , criando automaticamente 
    }),
    PostagemModule, // Reconhecer este modulo
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
