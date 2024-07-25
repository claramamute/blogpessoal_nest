import { Module } from "@nestjs/common";
import { Tema } from "./entities/tema.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemaController } from "./controllers/tema.controller";
import { TemaService } from "./services/tema.service";



@Module({
    // Importamos o TypeOrmModule com a entidade 'Tema'=>  cria uma tabela no banco de dados com base nessa entidade.
    imports: [TypeOrmModule.forFeature([Tema])], 

    // Registramos o serviço 'TemaService' => contém a lógica de negócios para os temas.
    providers: [TemaService],

    // Registramos o controlador 'TemaController' =>  lida com as requisições HTTP relacionadas aos temas.
    controllers: [TemaController],

    // Exportamos o TypeOrmModule para que outros módulos possam acessar a tabela 'Tema' no banco de dados.
    exports: [TypeOrmModule],
})

export class TemaModule{}