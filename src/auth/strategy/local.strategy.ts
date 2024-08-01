// Utilizado no processo de autenticação para validar as credenciais do usuário (usuario e senha).

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";

@Injectable() // Classe de Serviço
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor (private authService: AuthService){ //Injeções de Dependência -> precisa acesso aos Métodos da Classe AuthService -> injeta um Objeto desta Classe dentro do Construtor.
        super({
            usernameField: 'usuario', // Qual o nome do atributo que vai trazer a informação do usuario
            passwordField: 'senha' //Só precisa chamar esse super caso mudemos o nome do atributo 
        })
    }

    async validate(username: string, password: string): Promise<any>{ // Recebe usuario e senha como parametro
        const user = await this.authService.validateUser(username, password)

        if(!user)
            throw new UnauthorizedException();

        return user
    }
}