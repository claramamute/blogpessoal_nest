// Objeto que só recebe/faz login , não grava no banco de dados, por isso não tem decorador 
//Dentro do user guarda o email e o da senha guarda a senha

import { ApiProperty } from "@nestjs/swagger";

export class UsuarioLogin{

    @ApiProperty()
    public usuario: string;
    
    @ApiProperty()
    public senha: string;
    
}

