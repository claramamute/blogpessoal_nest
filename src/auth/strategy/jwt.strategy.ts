import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants/constants";


//que será utilizado por todos os endpoints protegidos das Classes Controladoras, para validar o Token JWT recebido no Cabeçalho das Requisições.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
       super({ //Para configurar as propriedades da Classe heradada
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Método com o qual extrairemos o Token JWT da Requisição -> extrai o Token JWT do Cabeçalho da Requisição
        ignoreExpiration: false, //bloquear solicitações com tokens expirados
        secretOrKey: jwtConstants.secret //chave de assinatura do Token JWT está armazenada no arquivo constants.ts, na const jwtConstants, na propriedade secret. Lembrando que em Produção, esta chave deve estar codificada e/ou protegida por questões de segurança.
       })
    }

    async validate(payload: any){
        return {userId: payload.sub, username: payload.username}
    }
}