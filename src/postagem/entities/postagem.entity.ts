// Classe para definir o modelo de dados(Model no modelo MVC) para construir a tabela tb_postagens (Entidade) 

import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";

//Dizer para o Nest e typeORM que precisa pegar essa classe, transformar em entidade (tabelas) no banco de dados

@Entity({name: 'tb_postagens'}) // Decorador para dizer que a classe é do tipo Entidade e gerará uma table tb_postagens 
export class Postagem{ // Classe postagem e seus atributos 
    
    @PrimaryGeneratedColumn() //Chave primária auto-incremental
    id: number;

    @IsNotEmpty() // Não pode estar vaazio (NULL) 
    @Column({length: 100, nullable: false}) // Tamanho do titulo e é obrigatório
    titulo : string;

    @IsNotEmpty()
    @Column({length: 1000, nullable: false}) 
    texto: string;

    @UpdateDateColumn() // A data será preenchida automaticamente
    data: Date;

    //- o Nest resolve os get-set e constructor

    // Muitos para um - muitas postagens possuem um tema
    @ManyToOne(() => Tema, (tema) => tema.postagem, { // A classe postagem está relacionada com tema. Como? => o objeto tema esta associado ao objeto postagem 
        //Colocar só na classe filha, até pq, quando se apaga uma postagem, não necessariamente precisa apagar o tema 
        onDelete: "CASCADE" // Configuração de cascateamento - quando apagar um opbjeto da classe tema, todas postagens associadas serão apagadas, sem órfaos
    }) 
    tema: Tema; //Objeto tema dentro da classe postagem - associação


}