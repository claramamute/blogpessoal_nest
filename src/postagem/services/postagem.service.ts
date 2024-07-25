// Classe de serviço responsavel de criar e implementar métodos (crud) para manipulaçao do banco de dados

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm"; // Trás interface repository
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TemaService } from "../../tema/services/tema.service";

@Injectable() // Indicar que é classe de serviço
export class PostagemService{
    constructor(
        //Com a injecao de dependecia está transferindo a responsa p/ o typeorm criar objeto, instanciar e manipular da Postagem
        @InjectRepository(Postagem) // vai aplicar métodos da repository 
        private postagemRepository: Repository<Postagem>, // objeto que vai ser instancia da repository que ira trabalhar com objetos da classe postagem - a classe repository possui métodos(instruções sql) para trabalhar com os banco de dados e tem que colocar a entidade que quer trabalhar como parametro - cria objeto e conecta com a entidade postagem 
        private temaService: TemaService
    ) {}

    async findAll(): Promise<Postagem[]> { //Devolve uma promessa de um array com objetos de postagens (dados da tb_postagem)
        return await this.postagemRepository.find({//Espera achar o objeto

            relations:{ //Pega relacionamentos dentro da classe
                tema: true //quando consultar todas as postagens, exibe o tema que está associado
            }
        }) 
        // select * from tb_postagens
        // na assincrona, uma função n depende de outra pra ser executada (busca em segundo plano, e site funcionando normalmente)
        // joga a busca em segundo plano, pra n travar o resto das features 
    }

    async findById(id: number): Promise<Postagem>{ // Retorna apenas um objeto

        let buscaPostagem = await this.postagemRepository.findOne({ // Trás apenas uma ocorrencia em que tem o id
            where: { // criterio id
                id
            },
            relations:{ 
                tema: true 
            }
        }) ;

        if(!buscaPostagem) // Se não achar a postagem 
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND) 
        
        return buscaPostagem; // retorna o objeto encontrado 
    }

    async findByTitle(titulo: string): Promise<Postagem[]>{ //Retorna um array que possui em alguma parte, o titulo com o LIKE %
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`) // Titulo que contenha alguma palavra na frase com (Insensitive Like) 
               
            },
            relations:{ 
                tema: true 
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem>{ // Confirmação se a postagem foi criada 

        if(postagem.tema){ //o user colocou tema? vai verificar se existe
            await this.temaService.findById(postagem.tema.id) //se sim, vai procurar o id do tema da postagem
            
            return await this.postagemRepository.save(postagem) // Salvar no banco o objeto 
        }
        return await this.postagemRepository.save(postagem) // Salvar no banco o objeto 

    }

    async update(postagem: Postagem):  Promise<Postagem>{
        let buscaPostagem: Postagem = await this.findById(postagem.id) //Busca pelo id da postagem que quer atualizar, é o que diferencia do create  

        if(!buscaPostagem || !postagem.id){ // Se for nula e o id não existir, exibe um erro
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)
        }

        if(postagem.tema){
            await this.temaService.findById(postagem.tema.id)
            
            return await this.postagemRepository.save(postagem) 
        }
        return await this.postagemRepository.save(postagem) // Se achou, salva o novo objeto postagem no lugar do outro 
    }

    
    async delete(id: number): Promise<DeleteResult>{ //Não devolve nada, pois exluiu - esse objeto serve para verificar se apagou ou nao 

        let buscaPostagem = await this.findById(id)

        if(!buscaPostagem) 
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND) 
        
        return await this.postagemRepository.delete(id); 
    }
    
}