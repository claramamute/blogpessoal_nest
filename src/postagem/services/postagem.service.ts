// Classe de serviço responsavel de criar e implementar métodos (crud) para manipulaçao do banco de dados

import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm"; // Trás interface repository
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable() // Indicar que é classe de serviço
export class PostagemService{
    constructor(
        //Com a injecao de dependecia está transferindo a responsa p/ o typeorm criar objeto, instanciar e manipular da Postagem
        @InjectRepository(Postagem) // vai aplicar métodos da repository 
        private postagemRepository: Repository<Postagem> // objeto que vai ser instancia da repository que ira trabalhar com objetos da classe postagem - a classe repository possui métodos(instruções sql) para trabalhar com os banco de dados e tem que colocar a entidade que quer trabalhar como parametro - cria objeto e conecta com a entidade postagem 
    ) {}

    async findAll(): Promise<Postagem[]> { //Devolve uma promessa de um array com objetos de postagens (dados da tb_postagem)
        return await this.postagemRepository.find() //Espera achar o objeto
        // select * from tb_postagens
        // na assincrona, uma função n depende de outra pra ser executada (busca em segundo plano, e site funcionando normalmente)
        // joga a busca em segundo plano, pra n travar o resto das features 
    }
}