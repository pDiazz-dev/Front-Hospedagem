document.addEventListener("DOMContentLoaded", () => {
    listarReservas();
});

let reservas = [];

async function listarReservas() {
    const tabelaBody = document.querySelector('.reservations-table-body');
    if (!tabelaBody) {
        toast("Erro interno: tabela de reservas não encontrada!", "error");
        return;
    }

    tabelaBody.innerHTML = '';

    try {
        const response = await fetch(`${config.API_URL}/reservas/reservas-recentes`);
        if (!response.ok) {
            toast("Erro ao buscar reservas recentes!", "error");
            return;
        }

        reservas = await response.json();

        reservas.forEach(reserva => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${reserva.hospede.nome}</td>
                <td>${reserva.quartos.numeroQuarto}</td>
                <td>${reserva.numeroDePessoas}</td>
                <td>${reserva.checkin}</td>
                <td>${reserva.checkout}</td>
                <td>
  <i 
    class="fa-solid fa-trash-can trashDelReserv"
    data-numero-quarto="${reserva.quartos.numeroQuarto}"
    data-cpf="${reserva.hospede.cpf}"
    data-checkin="${reserva.checkin}">
  </i>
</td>`;
            tabelaBody.appendChild(row);
        });

    } catch (error) {
        toast("Erro inesperado ao carregar reservas!", "error");
    }
}
