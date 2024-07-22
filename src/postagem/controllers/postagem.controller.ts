// Porta de entrada do recurso postagem 

import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

@Controller('/postagens') //Passa o caminho do recurso
export class PostagemController{
    
    constructor(private readonly postagemService: PostagemService){} // objeto da classe postagem service apenas para ler

    @Get() // Método de consulta
    @HttpCode(HttpStatus.OK)//Qual resposta http caso de certo (200)
    findAll(): Promise<Postagem[]>{ // Chama o método que foi criado na service 
        return this.postagemService.findAll()
    }
}