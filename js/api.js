/**
 * Configuração base da API e helper de requisições autenticadas.
 * Centraliza a URL da API e o envio automático do token JWT salvo no localStorage.
 */
const API_URL = 'https://helpdesk-api-nm1i.onrender.com';

/**
 * Executa uma requisição para a API, incluindo o token JWT (se existir) no header Authorization.
 * @async
 * @param {string} endpoint - Caminho da rota (ex: '/api/chamados').
 * @param {Object} [options={}] - Opções do fetch (method, body, etc).
 * @returns {Promise<Object>} O corpo da resposta já convertido em JSON.
 * @throws {Error} Caso a resposta não seja OK (status >= 400), lança um erro com a mensagem do backend.
 */
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const resposta = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.erro || 'Erro inesperado na requisição.');
  }

  return dados;
}

/**
 * Retorna o usuário logado salvo no localStorage.
 * @returns {Object|null} Dados do usuário ou null se não houver sessão ativa.
 */
function getUsuarioLogado() {
  const dados = localStorage.getItem('usuario');
  return dados ? JSON.parse(dados) : null;
}

/**
 * Verifica se há um usuário autenticado; caso não haja, redireciona para a tela de login.
 */
function protegerRota() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
  }
}