// Porta de entrada do recurso postagem 

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { Transform, TransformFnParams } from "class-transformer";

@Controller('/postagens') //Passa o caminho do recurso
export class PostagemController{
    
    constructor(private readonly postagemService: PostagemService){} // objeto da classe postagem service apenas para ler

    @Get() // Método de consulta
    @HttpCode(HttpStatus.OK)//Qual resposta http caso de certo (200)
    findAll(): Promise<Postagem[]>{ // Chama o método que foi criado na service 
        return this.postagemService.findAll()
    }

    @Get('/:id') // Váriavel de caminho na URL
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem>{ // Parametro para conectar com a variavel de ambiente e converter pra numero  - pega a var de caminho e converta para inteiro
        return this.postagemService.findById(id)
    }

    @Transform(({ value }: TransformFnParams) => value?.trim()) // Bloquear espaços em branco
    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitle(@Param('titulo')titulo: string): Promise<Postagem[]>{
        return this.postagemService.findByTitle(titulo)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem ): Promise<Postagem> { // Pega os dados em formato json do corpo da requisição(já que n vai na URL) e transforma em objeto 
        return this.postagemService.create(postagem)
    }
    
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem ): Promise<Postagem> { 
        return this.postagemService.update(postagem)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) // Confirmar que foi excluido, sem conteudo 204
    delete(@Param('id', ParseIntPipe) id: number){
        return this.postagemService.delete(id)
    }
}