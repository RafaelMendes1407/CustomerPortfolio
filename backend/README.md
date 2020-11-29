# Customer Portfolio

Projeto backend de uma Carteira de Clientes

## Download das Dependências

Com o NPM na pasta backend do projeto digite no terminal.

```bash
npm i
```
ou com Yarn
```bash
yarn
```
Espere o fim do download das dependências

## Inicialização da API

```bash
npm run dev
```
ou com Yarn
```bash
yarn dev
```
Com isso o servidor estará rodando por padrão na porta 3333. É importante que o MongoDB já sido tenha iniciado na sua porta padrão.


## EndPoints
São 6 os Endpoints disponiveis na API /users, / clients, /phone, /email, /adress e /authenticate

Para começar o uso da API é necessário fazer um cadastro através da rota /users com o método POST
```JSON
{
	"name": "Admin",
	"email": "email@email.com",
	"document":"789456123",
	"password": "123456"
}

```
O retorno deve ser um status 201 com o Usuário Cadastrado.

Na rota de /authenticate com o metodo POST envie os dados de email e password.
```JSON
{
	"email": "email@email.com",
	"password": "123456"
}

```
Com o usuário e as senhas corretas será retornado um token de acesso para as outras funcionalidades da API.

Para testes dos Endpoints foi usado o [Insominia](https://insomnia.rest/download/) que é um software open source. Com o token, basta adicionar um campo de Authorization no Header da requisição com o 'bearer +token'

As rotas de usuários possuem ainda os métodos PUT na rota '/users/:id' passando o ID para que seja feita atualizações cadastrais, o metodo '/users/pass/:id' para alterações de senha e o DELETE para debug.

### Endpoint de Clientes
Com um token valido para acesso, quando disparado contra '/clients' com o método GET todos os clientes cadastrados para um usuário são retornados. Com o método POST é possível cadastrar novos clientes.

```JSON
{
	"client": {
		"name": "Rafael",
		"document": ""
	},
	"phone":{
		"phone":"9999-9999",
		"areaCode": 34
	},
	"email":{
		"email":"email@email.com",
		"domain":"email"
	},
	"adress":{
		"city": "Example",
		"street": "Street 1",
		"number": 17,
		"neighbourhood": "Example",
		"complement": "Ap 301",
		"country": "Any Country"
	}
}

```
É obrigatório no cadastro do cliente serem informados todos os campos
Qualquer informação complementar pode ser passada depois através das rotas '/phone', '/email' e '/adress' com um post passando além das informações acima o clientId ao qual pertence, conforme modelo abaixo.

```JSON
{
	"clientId": "5fc11a4bcfa6b21e1bf6a975",
	"email": "newemail@email.com",
	"domain": "email"
} 
```
Também é possível apagar e alterar todas as informações de contato, basta obter o _id do registro. Para isso, com um token valido, dispare um GET contra '/clients'.
Todos os clientes do usuário dono do token serão listados com o _id basta disparar novamente contra '/clients/:id' assim todas as informações do cliente serão listadas, incluindo todas as formas de contato.

## 🎲 TESTES 

Foram realizados alguns testes de Integração usando a técnica do TDD.

Para executar esses testes basta executar no terminal:

```bash
npm run test
```
ou 
```bash
yarn test
```
### 🛠 Tecnologias

Foram usadas as seguintes ferramentas na construção do projeto:

- [Express](https://expressjs.com/pt-br/)
- [Node.js](https://nodejs.org/en/)
- [BCrypt](https://www.npmjs.com/package/bcrypt)
- [JsonwebToken](https://jwt.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)