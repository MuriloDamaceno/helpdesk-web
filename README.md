# 🎧 HelpDesk Web

Front-end do sistema HelpDesk: interface web em HTML, CSS e JavaScript puro (vanilla JS) que consome a HelpDesk API de forma assíncrona (`fetch`), permitindo que clientes abram chamados de suporte e técnicos os atendam.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

## 🛠️ Tecnologias Utilizadas

* **HTML5 / CSS3** — estrutura e estilo das telas
* **JavaScript (vanilla)** — lógica de interface, sem frameworks
* **Fetch API** — consumo assíncrono da HelpDesk API (JSON)
* **localStorage** — armazenamento do token JWT e dos dados do usuário logado no navegador

## ✨ Funcionalidades Principais

- [x] **Login e Cadastro:** autenticação via JWT, com o token salvo no `localStorage`
- [x] **Proteção de rotas no cliente:** páginas privadas redirecionam para o login se não houver token válido (`protegerRota()`)
- [x] **Listagem de Chamados:** exibe todos os chamados (técnico) ou apenas os próprios (cliente)
- [x] **Abertura de Chamados:** formulário para clientes abrirem novos chamados
- [x] **Detalhes e Comentários:** visualização do chamado com histórico de comentários e envio de novos
- [x] **Atualização de Status:** técnicos podem alterar o status do chamado (`Aberto`, `Em Atendimento`, `Concluído`) diretamente na tela de detalhes
- [x] **Logout:** limpa o token e os dados do usuário do `localStorage`

## 📁 Estrutura do Projeto
helpdesk-web/
├── index.html <- Tela de login
├── cadastro.html <- Tela de cadastro
├── chamados.html <- Listagem de chamados
├── novo-chamado.html <- Abertura de novo chamado
├── detalhes.html <- Detalhes do chamado + comentários
├── css/
│ └── style.css
└── js/
├── api.js <- Configuração da API_URL e helper de requisições autenticadas
├── auth.js <- Lógica de login e cadastro
├── chamados.js <- Lógica da listagem e abertura de chamados
└── detalhes.js <- Lógica da tela de detalhes/comentários/status


## 📦 Como Executar o Projeto Localmente

Como é um front-end estático (sem build/bundler), não precisa de `npm install`. Basta servir os arquivos:

### Opção 1 — Extensão Live Server (VS Code)
1. Clone o repositório e abra a pasta no VS Code.
2. Clique com o botão direito em `index.html` → **"Open with Live Server"**.

### Opção 2 — Servidor estático simples
```bash
git clone https://github.com/MuriloDamaceno/helpdesk-web.git
cd helpdesk-web
npx serve .
```

## 🔗 Configuração da API

Este front-end **não usa `.env`** (é puramente estático, sem etapa de build). A URL da API é definida diretamente em `js/api.js`:

```js
const API_URL = 'https://helpdesk-api-nm1i.onrender.com';
```

Para rodar contra uma API local durante o desenvolvimento, troque temporariamente essa linha para `http://localhost:4000` (ou a porta configurada no `helpdesk-api`).

## 🌐 Deploy

* **Front-end (Vercel):** https://helpdesk-web-delta.vercel.app
* **API consumida (Render):** https://helpdesk-api-nm1i.onrender.com
* **Documentação da API (Swagger):** https://helpdesk-api-nm1i.onrender.com/api-docs

## ✒️ Autor

**Murilo Damaceno** — Desenvolvimento Front-end