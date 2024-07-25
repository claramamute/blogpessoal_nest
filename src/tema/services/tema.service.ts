
// Classe de serviço => criar e implementar métodos (crud) para manipulaçao do banco de dados

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable() // Decorador para mostrar que é classe de serviço => será injetada em outras partes do aplicativo
export class TemaService{
    constructor(
        // Decorador q faz a injeção de dependência, permitindo que o TypeORM gerencie a instância de postagemRepository.
        @InjectRepository(Tema)
        private temaRepository : Repository<Tema> // temaRepository é o objeto que permite interagir com a tabela temas(que foi configurado) no banco de dados
    ) {}

    async findAll(): Promise<Tema[]> { 
        return await this.temaRepository.find({
            relations:{ 
                postagem: true 
            }
        });
    }

    async findById(id: number): Promise<Tema>{ // Retorna apenas um objeto

        let buscaTema = await this.temaRepository.findOne({ // Espera encontrar o tema em que tenha esse id
            where: {
                id
            },
            relations:{ 
                postagem: true 
            }
        })

        if(!buscaTema)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND)

        return buscaTema
    }

    async findByDescription (descricao: string): Promise<Tema[]>{ // Retorna lista de temas que possuem o texto na descricao
        return await this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`) // Espera encontrar os temas que possuem o texto passado na url 
            },
            relations:{ 
                postagem: true 
            }
        })
    }

    async create(tema: Tema): Promise<Tema>{
        return await this.temaRepository.save(tema) //Salva esse objeto tema novo no repositorio
    }

    async update(tema: Tema): Promise<Tema>{
        let buscaTema = await this.findById(tema.id)

        if (!buscaTema || !tema.id)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

        return await this.temaRepository.save(tema);
    }

    async delete(id:number): Promise<DeleteResult>{ //Retorna um resultado se foi deletado
        let buscaTema = await this.findById(id);

        if (!buscaTema)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

        return await this.temaRepository.delete(id);
    }
}
