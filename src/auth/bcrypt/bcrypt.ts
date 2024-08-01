import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()// Já que vai ser usada em outras Classes 
export class Bcrypt{
    
    //Métodos assincronos para trabalhar em segundo plano

    async criptografarSenha(senha:string): Promise<string>{ //retorna a string criptografada
        let saltos: number = 10 //saltos para inserir na criptografia
        return await bcrypt.hash(senha,saltos)

    } // Gravar no banco a senha criptografada ao criar e atualizar usuário

    async compararSenhas(senhaBanco: string, senhaDigitada: string ): Promise<boolean>{ //Validar o login, se deu match (true) ou não (false)
        return  bcrypt.compareSync(senhaDigitada, senhaBanco)
    }

}