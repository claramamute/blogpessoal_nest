import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entity";
import { Transform, TransformFnParams } from "class-transformer";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('/temas')
export class TemaController{
    constructor(private readonly temaService: TemaService){} 

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Tema[]>{
        return this.temaService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tema>{ //Transforma o id da url em numero para trabalhar na busca
        return this.temaService.findById(id)
    }

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK)
    findByDescription(@Param('descricao') descricao: string): Promise<Tema[]>{
        return this.temaService.findByDescription(descricao)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() tema: Tema ): Promise<Tema> { // Pega os dados em formato json do corpo da requisição(já que n vai na URL) e transforma em objeto 
        return this.temaService.create(tema)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() tema: Tema ): Promise<Tema> {
        return this.temaService.update(tema)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) // Confirmar que foi excluido, sem conteudo 204
    delete(@Param('id', ParseIntPipe) id: number){
        return this.temaService.delete(id)
    }
}