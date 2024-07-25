import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";


@Entity ({name: 'tb_temas' }) //Decorador Entidade para mostrar o modelo (mvp) da tabela
export class Tema{

    @PrimaryGeneratedColumn() //Atributos que os objetos criados terão que ter 
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    descricao: string;

    // Um para muitos => um tema pode ter muitas postagens (Essa é a chave primária) classe Mãe 
    @OneToMany(() => Postagem, (postagem) =>  postagem.tema) //Esse objeto estara relacionado a classe Postagem e o elemento sera associado por meio de tema
    postagem: Postagem[] //Objeto postagem, pode ser array pois podem ter várias postagens associadas a um tema 

}