//Cria um decorador personalizado para o método de identificação (login)
// utilizado pelo endpoint de autenticação para receber as credenciais do usuário (usuario e senha) e enviar para o Passport.

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}