//Guardar assinatura (signature) do arquivo 
//Usada para gerar o TOKEN

export const jwtConstants = {
    secret: '37eb3d74e44561d2b9ec3e40da179f9e91571b7f350aee31cfee06b481f146fe', //hash criada
    //Armazenar a chave de assinatura do Token JWT (Secret). Todos os Tokens JWT gerados na aplicação serão assinados com esta chave de assinatura. Para uma aplicação em produção, quanto mais complexa for a chave, mais seguro será o Token JWT. Importante destacar que quando uma requisição receber o Token JWT, o token será validado através desta chave.
};