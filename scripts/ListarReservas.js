document.addEventListener("DOMContentLoaded", () => {
    listarReservas();
});
let reservas = [];

async function listarReservas() {
    const tabelaBody = document.querySelector('.reservations-table-body');
    if (!tabelaBody) {
        console.error("Elemento '.reservations-table-body' não encontrado!");
        return;
    }
    tabelaBody.innerHTML = '';

    try {
        const response = await fetch(`${config.API_URL}/reservas/reservas-recentes`);
        if (!response.ok) {
            console.error('Erro ao buscar reservas');
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
               <td><i class="fa-solid fa-trash-can trashDelReserv " data-set = ${reserva.quartos.numeroQuarto}></i></td>
            `;
            tabelaBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao processar a lista de reservas:', error);
    }
}