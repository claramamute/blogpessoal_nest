// Classe para definir o modelo de dados(Model no modelo MVC) para construir a tabela tb_postagens (Entidade) 

import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

}