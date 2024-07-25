// Classe Modulo do Recurso Postagem

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";
import { TemaModule } from "../tema/tema.module";
import { TemaService } from "../tema/services/tema.service";

@Module({ //Classe principal do Módulo, ou seja, nela registraremos todas as Classes (Entidade, Service e Controller) criadas dentro do Módulo que fazem parte do recurso

    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule], // Usar essa classe postagem para gerar uma nova tabela do banco -  importar todas as Classes Entidade (Model)
    providers: [PostagemService, TemaService], //  importar todas as Classes de Serviço do Módulo - processamento - trouxe tema para cadastrar postagem so se houver o tema 
    controllers: [PostagemController], // Classes controladoras - porta de entrada - requisições 
    exports: [TypeOrmModule], // exportar para gerar a tabela no banco 
})

export class PostagemModule{}