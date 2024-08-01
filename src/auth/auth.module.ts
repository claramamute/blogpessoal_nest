import { Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { UsuarioModule } from "../usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { AuthController } from "./controllers/auth.controller";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        UsuarioModule, //validar o usuário e senha no Banco de dados da aplicação no processo de autenticação do usuário (login).
        PassportModule, //para implementar o pacote Passport e as suas Strategies.
        JwtModule.register({ //criar o token - executar o Método register() para configurar algumas propriedades dentro do Módulo.
            secret: jwtConstants.secret, // propriedade secret (chave de assinatura do token JWT) com o valor da propriedade secret da const jwtConstants
            signOptions: {expiresIn: '1h'} //Tempo de expiração (opções do processo de criação do token)
        })

    ],
    providers: [Bcrypt,AuthService,LocalStrategy,JwtStrategy], // Ser classe de serviço
    controllers: [AuthController], // Gera endpoint para autenticar
    exports: [Bcrypt], // Exportar para usar globalmente na aplicação
})
export class AuthModule {}