// Carrega lista ao abrir a página
document.addEventListener("DOMContentLoaded", listarReservasNaoFeitas);

async function listarReservasNaoFeitas() {
    try {
        const response = await fetch("http://localhost:8080/reservas/reserva-nao-feita");

        if (!response.ok) {
            createToastNotification(
                'Erro',
                'Não foi possível buscar as reservas com pagamento pendente!',
                'fa-solid fa-circle-xmark',
                'Erro!'
            );
            throw new Error("Erro ao buscar reservas não realizadas");
        }

        const reservas = await response.json();
        const tbody = document.querySelector("#finance-nao-realizado");
        tbody.innerHTML = "";

        reservas.forEach(r => {
            const row = document.createElement("tr");

            const nomeHospede = r.hospede?.nome ?? "Não informado";
            const checkin = r.checkin ?? "—";
            const checkout = r.checkout ?? "—";

            row.innerHTML = `
                <td>${checkin}</td>

                <td>
                    <strong>${nomeHospede}</strong>
                </td>

                <td>${checkout}</td>
            `;

            tbody.appendChild(row);
        });

    } catch (error) {
        console.error("Erro ao listar reservas não realizadas:", error);

        // Erro inesperado
        createToastNotification(
            'Erro',
            'Erro inesperado ao carregar reservas pendentes!',
            'fa-solid fa-circle-xmark',
            'Erro!'
        );
    }
}
