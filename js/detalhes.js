/**
 * Controla a exibição dos detalhes de um chamado, seus comentários,
 * a criação de novos comentários e a atualização de status (restrita a técnicos).
 */

protegerRota();

const usuarioLogado = getUsuarioLogado();
const idChamado = new URLSearchParams(window.location.search).get('id');
const divDetalhes = document.getElementById('detalhes-chamado');
const divMensagemDetalhes = document.getElementById('mensagem');

/**
 * Carrega os detalhes do chamado (incluindo comentários) e monta a tela.
 * @async
 */
async function carregarDetalhes() {
  try {
    const chamado = await apiRequest(`/api/chamados/${idChamado}`);
    renderizarChamado(chamado);
  } catch (erro) {
    divMensagemDetalhes.innerHTML = `<p class="erro">${erro.message}</p>`;
  }
}

/**
 * Renderiza os dados do chamado, comentários e ações disponíveis conforme o tipo do usuário.
 * @param {Object} chamado - Dados do chamado retornados pela API.
 */
function renderizarChamado(chamado) {
  const ehTecnico = usuarioLogado.tipo === 'tecnico';

  const opcoesStatus = ['Aberto', 'Em Atendimento', 'Concluído']
    .map(s => `<option value="${s}" ${s === chamado.status ? 'selected' : ''}>${s}</option>`)
    .join('');

  const comentariosHtml = chamado.comentarios.map(c => `
    <div class="comentario">
      <p class="autor">${c.nome} (${c.tipo})</p>
      <p>${c.mensagem}</p>
      <p class="data">${new Date(c.criado_em).toLocaleString('pt-BR')}</p>
    </div>
  `).join('') || '<p>Nenhum comentário ainda.</p>';

  divDetalhes.innerHTML = `
    <h1>${chamado.titulo}</h1>
    <p>${chamado.descricao}</p>
    <p><strong>Status:</strong> <span class="status-badge status-${chamado.status.replace(' ', '-').replace('ã', 'a').replace('í', 'i')}">${chamado.status}</span></p>
    <p><strong>Aberto em:</strong> ${new Date(chamado.criado_em).toLocaleDateString('pt-BR')}</p>

    ${ehTecnico ? `
      <div class="acoes-tecnico">
        <select id="novo-status">${opcoesStatus}</select>
        <button id="btn-atualizar-status">Atualizar Status</button>
      </div>
    ` : ''}

    <div class="comentarios">
      <h2>Comentários</h2>
      ${comentariosHtml}

      <form class="form-comentario" id="form-comentario">
        <textarea id="mensagem-comentario" rows="2" placeholder="Escreva um comentário..." required></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  `;

  const btnStatus = document.getElementById('btn-atualizar-status');
  if (btnStatus) {
    btnStatus.addEventListener('click', atualizarStatus);
  }

  document.getElementById('form-comentario').addEventListener('submit', enviarComentario);
}

/**
 * Envia a atualização de status do chamado (restrito a técnicos).
 * @async
 */
async function atualizarStatus() {
  const novoStatus = document.getElementById('novo-status').value;

  try {
    await apiRequest(`/api/chamados/${idChamado}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: novoStatus })
    });

    carregarDetalhes();
  } catch (erro) {
    divMensagemDetalhes.innerHTML = `<p class="erro">${erro.message}</p>`;
  }
}

/**
 * Envia um novo comentário para o chamado atual.
 * @async
 * @param {Event} evento - Evento de submit do formulário.
 */
async function enviarComentario(evento) {
  evento.preventDefault();
  const mensagem = document.getElementById('mensagem-comentario').value;

  try {
    await apiRequest(`/api/chamados/${idChamado}/comentarios`, {
      method: 'POST',
      body: JSON.stringify({ mensagem })
    });

    carregarDetalhes();
  } catch (erro) {
    divMensagemDetalhes.innerHTML = `<p class="erro">${erro.message}</p>`;
  }
}

carregarDetalhes();