import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { Tema } from './tema/entities/tema.entity';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';

@Module({
  imports: [  // Criar a conexão com banco de dados
    TypeOrmModule.forRoot({ // Objeto ==> Entidades (tabelas) para todo o projeto
      type: 'mysql', // tipo do banco 
      host: 'localhost', // endereço do banco
      port: 3306, // porta 
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal', // qual db
      entities: [Postagem, Tema, Usuario], // Vetor para registrar tabelas 
      synchronize: true, // sincronização do typeORM com tabelas , criando automaticamente 
      logging: true, // Mostra as instruções sql da busca - usa apenas no desenvolvimento 
    }),
    PostagemModule,     // Reconhecer este modulo que está registrada todas as Classes que vão compor esse recurso 
    TemaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
