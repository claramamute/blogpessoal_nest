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
      logging: true, // Mostra as instruções sql da busca - usa apenas no desenvolvimento 
    }),
    PostagemModule, // Reconhecer este modulo que está registrada todas as Classes que vão compor esse recurso 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
