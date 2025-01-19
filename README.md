# 🎬 AluraFlix - A Plataforma de Vídeos de Tecnologia 🚀

**AluraFlix** é um projeto desenvolvido para demonstrar uma plataforma de vídeos com categorias como **Frontend**, **Backend**, **Inovação**, **Ciência de Dados** e mais! 
Com um design simples e intuitivo, você pode explorar conteúdos e gerenciar vídeos de forma prática. 💻📱

## Funcionalidades 🔧

- **Adicionar Vídeo**: Crie novos cards de vídeo com título, URL, categoria e descrição. 📹
- **Excluir Card**: Remova vídeos da plataforma e, se precisar, use a opção de **Desfazer** a exclusão. 🗑️
- **Ver Agora**: Acesse seu vídeo assim que incluí-lo. 🎥
  
## Implementações 🛠️

- **Mockups de APIs**: Utilizamos uma **API mockada** com **GET**, **POST** e **DELETE** para testar as funcionalidades de adicionar, visualizar e excluir vídeos.
- **API**: O backend foi simulado com um arquivo **db.json**, em que os dados de vídeos são armazenados, simulando uma comunicação real com o servidor.
- **CRUD Completo**: Implementação das operações de **Criar**, **Ler**, **Atualizar** e **Deletar** para gerenciar os vídeos.

## Tecnologias Utilizadas ⚙️

- **React.js**: Para construir a interface de usuário interativa e dinâmica. ⚛️
- **Axios**: Para realizar as requisições HTTP de **GET**, **POST** e **DELETE**. 🌐
- **db.json** (mock API): Simula um backend para armazenar e manipular os vídeos. 🔐
- **CSS**: Para o estilo da aplicação e uma apresentação visual agradável. 🎨

## Como Rodar o Projeto 🔥

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Antymonium/AluraFlix.git
   cd AluraFlix
   npm install
   npm start

O projeto estará disponível em http://localhost:3000 🌍

⚠️ Para ver os vídeos é preciso Instalar json-server (caso não tenha):
npm install -g json-server

Rodar o servidor mockado:
json-server --watch db.json --port 3001

Só então iniciar o projeto:
npm start
