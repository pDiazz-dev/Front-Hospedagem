document.addEventListener("DOMContentLoaded", () => {
  listarQuartos();
});

let quartos = [];

async function listarQuartos() {
  const tabelaBody = document.querySelector('.rooms-table-Body');
  if (!tabelaBody) {
    console.error("Elemento '.rooms-table-Body' não encontrado!");
    return;
  }

  tabelaBody.innerHTML = '';

  try {
    const response = await fetch(`${config.API_URL}/quartos`);
    if (!response.ok) {
      console.error('Erro ao buscar quartos');
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
    console.error('Erro ao processar a lista de quartos:', error);
  }
}
