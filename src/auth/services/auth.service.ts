import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';


//responsável por criar os Métodos de Autenticação (login) e Validate (validar as credenciais do usuario e gerar o token JWT).

@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService, // 
        private jwtService: JwtService, // Responsável por gerar TOKEN
        private bcrypt: Bcrypt // Validar senha do usuario por meio do compararSenhas 
    ){ }

    async validateUser(username: string, password: string): Promise<any>{// Validar autentificação 

        const buscaUsuario = await this.usuarioService.findByUsuario(username)

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenhas(buscaUsuario.senha, password) // senha do banco - sneha digitada 

        if(buscaUsuario && matchPassword){
            const { senha, ...resposta } = buscaUsuario // a resposta é tudo que está dentro do usuario, separando a senha DESESTRUTURAÇÃO SPREED
            return resposta
        }

        return null

    }

    async login(usuarioLogin: UsuarioLogin){ //Responsável por criar TOKEN 

        const payload = { sub: usuarioLogin.usuario } // preenche o campo sub do token com o nome do usuario

        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario)

        return{ // retorna tudo para ser mais facil de criar o front
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: usuarioLogin.usuario,
            senha: '',
            foto: buscaUsuario.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`, // Geração do TOKEN pelo payload- espaço obrigatorio
        }

    }
}