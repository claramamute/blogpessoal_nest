import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuario e Auth (e2e)', () => {

  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => { //Executa uma unica vez antes de rodar os testes- pega a aplicação e gera uma cópia para trabalhar com teste
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:", // será gerado na memória, ou seja, ao finalizar o teste, o banco deixará de existir
          entities: [__dirname + "./../src/**/entities/*.entity.ts"], //pega apenas aas entidades
          synchronize: true,
          dropSchema: true //caso ficar sujeira na memória, elimina
        }),  //configurando o banco de dados de teste
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => { //Quando terminar de rodar os testes, vai fechar a aplicação
    await app.close();
  });

  it("01 - Deve cadastrar um novo usuário" , async () => {
    const resposta = await request(app.getHttpServer()) //usar o servidor passado acima
    .post("/usuarios/cadastrar") //requisição post para esse endpoint - endereço
    .send({ //mandando objeto que quer persistir no banco
      nome: 'Boot',
      usuario: 'boot@gamil.com',
      senha: 'bootroot',
      foto: '-'
    })
    .expect(201); // espera que devolva status 201- created

    usuarioId = resposta.body.id; //dentro do corpo da requisição pega o id do banco de dados
  })

  it("02 - Não deve cadastrar um usuário duplicado" , async () => {
    await request(app.getHttpServer()) 
    .post("/usuarios/cadastrar") 
    .send({
      usuario: 'boot@gamil.com',
      senha: 'bootroot',
      foto: '-'
    })
    .expect(400); 
     
  })

  it("03 - Deve autenticar o usuário" , async () => {
    const resposta = await request(app.getHttpServer()) 
    .post("/usuarios/logar") 
    .send({
      usuario: 'boot@gamil.com',
      senha: 'bootroot',
      
    })
    .expect(200); 
    
    token = resposta.body.token
  })

  it("04 - Deve listar os usuários" , async () => {
    const resposta = await request(app.getHttpServer()) 
    .get("/usuarios/all")
    .set('Authorization', `${token}`)
    .send({})
    .expect(200); 

  })

  it("05 - Deve atualizar o usuário" , async () => {
    return  request(app.getHttpServer()) 
    .put("/usuarios/atualizar")
    .set('Authorization', `${token}`)
    .send({ 
      id: usuarioId,
      nome: 'Adm',
      usuario: 'boot@gamil.com',
      senha: 'bootroot',
      foto: '-'
    })
    .expect(200) 
    .then( resposta => {
      expect("Adm").toEqual(resposta.body.nome) //pega a informação do corpo da requisição e verifica se batea com o que está lá dentro 
    })
    
  })
  
  it("06 - Deve Listar apenas um Usuário pelo id", async () => {
    return request(app.getHttpServer())
    .get(`/usuarios/${usuarioId}`)
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  })

});
