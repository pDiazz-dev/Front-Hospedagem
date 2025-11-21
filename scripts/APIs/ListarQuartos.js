document.addEventListener("DOMContentLoaded", () => {
  listarQuartos();
});

let quartos = [];

async function listarQuartos() {
  const tabelaBody = document.querySelector('.rooms-table-Body');
  if (!tabelaBody) {
    toast("Erro interno: elemento da tabela não encontrado!", "error");
    return;
  }

  tabelaBody.innerHTML = '';

  try {
    const response = await fetch(`${config.API_URL}/quartos`);
    if (!response.ok) {
      toast("Erro ao buscar a lista de quartos!", "error");
      return;
    }

    quartos = await response.json();

    quartos.forEach(quarto => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${quarto.tipoQuarto}</td>
        <td>${quarto.numeroQuarto}</td>
        <td>${quarto.ativo ? 'Ativo' : 'Inativo'}</td>
      `;
      tabelaBody.appendChild(row);
    });

  } catch (error) {
    toast("Erro inesperado ao carregar quartos!", "error");
  }
}
