/**
 * Controla os formulários de login e cadastro, incluindo autenticação e redirecionamento.
 */

const formLogin = document.getElementById('form-login');
const formCadastro = document.getElementById('form-cadastro');
const divMensagem = document.getElementById('mensagem');

/**
 * Exibe uma mensagem de erro ou sucesso na tela.
 * @param {string} texto - Texto a ser exibido.
 * @param {'erro'|'sucesso'} tipo - Tipo da mensagem, define o estilo aplicado.
 */
function exibirMensagem(texto, tipo) {
  divMensagem.innerHTML = `<p class="${tipo}">${texto}</p>`;
}

if (formLogin) {
  formLogin.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
      const dados = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, senha })
      });

      localStorage.setItem('token', dados.token);
      localStorage.setItem('usuario', JSON.stringify(dados.usuario));

      window.location.href = 'chamados.html';
    } catch (erro) {
      exibirMensagem(erro.message, 'erro');
    }
  });
}

if (formCadastro) {
  formCadastro.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const tipo = document.getElementById('tipo').value;

    try {
      await apiRequest('/api/auth/registrar', {
        method: 'POST',
        body: JSON.stringify({ nome, email, senha, tipo })
      });

      exibirMensagem('Cadastro realizado! Redirecionando para o login...', 'sucesso');
      setTimeout(() => { window.location.href = 'index.html'; }, 1500);
    } catch (erro) {
      exibirMensagem(erro.message, 'erro');
    }
  });
}