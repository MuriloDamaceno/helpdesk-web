/**
 * Controla a listagem de chamados e a criação de novos chamados.
 */

protegerRota();

const usuario = getUsuarioLogado();
const spanNomeUsuario = document.getElementById('nome-usuario');
const btnLogout = document.getElementById('btn-logout');

if (spanNomeUsuario && usuario) {
  spanNomeUsuario.textContent = `Olá, ${usuario.nome} (${usuario.tipo})`;
}

if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
  });
}

const listaChamados = document.getElementById('lista-chamados');
const btnNovo = document.getElementById('btn-novo');
const divMensagem = document.getElementById('mensagem');

/**
 * Carrega e renderiza a lista de chamados vindos da API.
 * @async
 */
async function carregarChamados() {
  try {
    const chamados = await apiRequest('/api/chamados');

    if (chamados.length === 0) {
      listaChamados.innerHTML = '<p>Nenhum chamado encontrado.</p>';
      return;
    }

    listaChamados.innerHTML = chamados.map(chamado => `
      <div class="card-chamado">
        <div>
          <a href="detalhes.html?id=${chamado.id_chamado}">${chamado.titulo}</a>
          <p style="margin:4px 0 0; color:#666; font-size:0.9em;">${new Date(chamado.criado_em).toLocaleDateString('pt-BR')}</p>
        </div>
        <span class="status-badge status-${chamado.status.replace(' ', '-').replace('ã', 'a').replace('í', 'i')}">${chamado.status}</span>
      </div>
    `).join('');
  } catch (erro) {
    divMensagem.innerHTML = `<p class="erro">${erro.message}</p>`;
  }
}

if (listaChamados) {
  if (usuario && usuario.tipo === 'cliente' && btnNovo) {
    btnNovo.style.display = 'inline-block';
  }
  carregarChamados();
}

const formNovoChamado = document.getElementById('form-novo-chamado');

if (formNovoChamado) {
  formNovoChamado.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;

    try {
      await apiRequest('/api/chamados', {
        method: 'POST',
        body: JSON.stringify({ titulo, descricao })
      });

      window.location.href = 'chamados.html';
    } catch (erro) {
      document.getElementById('mensagem').innerHTML = `<p class="erro">${erro.message}</p>`;
    }
  });
}