# Chatbot FURIA Esports

Este é um chatbot especializado em responder perguntas sobre o **FURIA Esports** (CS:GO/CS2). A aplicação utiliza tecnologias modernas para fornecer respostas rápidas e precisas em tempo real, seja através de respostas pré-definidas ou por meio de uma API de inteligência artificial para perguntas não registradas.

## Tecnologias Utilizadas

- **Frontend**: Vite + React
- **Backend**: Node.js + Express
- **Banco de Dados**: MongoDB (armazenamento de respostas)
- **API de IA**: Hugging Face (para respostas quando não há correspondência no banco de dados)
- **Docker**: Utilizado para facilitar o ambiente de desenvolvimento e produção

## Pré-requisitos

Antes de rodar o projeto, é necessário ter os seguintes softwares instalados:

- **Node.js**: [Link de instalação](https://nodejs.org/)
- **Docker**: [Link de instalação](https://www.docker.com/get-started)
- **MongoDB Atlas**: Configurar um banco de dados MongoDB no Atlas. Você pode seguir [este guia de configuração](https://www.mongodb.com/cloud/atlas) para criar uma conta e obter a URI de conexão.

## Como Rodar o Projeto

## Com Docker

```bash
Clone o repositório: git clone https://github.com/caduoliveira01/Furia-ChatBot.git 
Entre na pasta: cd Furia-ChatBot
Em seguida cria um arquivo .env na raiz do backend como mostrado no .env.example com suas chaves.
Abra o docker desktop e insira esse comando no terminal do projeto: docker-compose up --build
```

## Sem Docker
```bash
Clone o repositório: git clone https://github.com/caduoliveira01/Furia-ChatBot.git 
Entre na pasta: cd Furia-ChatBot/backend
Em seguida cria um arquivo .env na raiz do backend como mostrado no .env.example com suas chaves.
Digite o comando npm install
Digite o comando node server.js
Entre na pasta: cd Furia-ChatBot/frontend
Digite o comando npm install
Digite o comando npm run dev e abra a porta 5137 (padrão vite) no seu localhost
```

## Como funciona
O chatbot responde a perguntas relacionadas ao FURIA Esports. Quando o usuário envia uma mensagem, a aplicação verifica se a mensagem contém palavras-chave relacionadas ao time ou jogadores do FURIA (ex: "kscerato", "csgo", "ranking", etc.).

Se a mensagem contém uma keyword conhecida, o bot retorna uma resposta registrada no banco de dados MongoDB.

Se não houver resposta registrada, o bot faz uma chamada para a API de inteligência artificial do Hugging Face para gerar uma resposta.

Endpoint de Chat
POST /api/chat

Esse endpoint recebe uma mensagem do usuário e retorna uma resposta de acordo com as palavras-chave ou utilizando a IA.

Request:{
  "message": "Qual o calendario da furia?"
}
Resposta:
{
  "reply": "Próximos jogos: hltv.org/team/8297/FURIA (atualizado ao vivo)."
}

## Desenvolvido por:
Carlos Oliveira

### 📌 Linkedin:
[Carlos Oliveira](https://www.linkedin.com/in/carlos-oliveira-338a04233/)
