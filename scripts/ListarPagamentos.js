document.addEventListener("DOMContentLoaded", listarPagamentos);

async function listarPagamentos() {
    try {
        const response = await fetch("http://localhost:8080/pagamento");
        if (!response.ok) {
            throw new Error("Erro ao buscar pagamentos");
        }

        const pagamentos = await response.json();
        const tbody = document.querySelector("#finance-tbody");
        tbody.innerHTML = "";

        pagamentos.forEach(p => {
            const row = document.createElement("tr");

            const nomeHospede = p.reservas?.hospede?.nome ?? "Não informado";
            const checkin = p.reservas?.checkin ?? "—";
            const checkout = p.reservas?.checkout ?? "—";

            const valor = Number(p.valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

            row.innerHTML = `
                <td>${p.data}</td>
                <td>
                    <strong>${nomeHospede}</strong><br>
                    Check-in: ${checkin}<br>
                    Checkout: ${checkout}
                </td>
                <td>${valor}</td>

                <td class="text-center">
                    <button class="btn-delete" onclick="deletarPagamento('${p.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

            tbody.appendChild(row);
        });

    } catch (error) {
        console.error("Erro ao processar pagamentos:", error);
    }
}


async function deletarPagamento(id) {
    if (!confirm("Deseja realmente deletar este pagamento?")) return;

    try {
        const response = await fetch(`http://localhost:8080/pagamento/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            alert("Erro ao deletar pagamento.");
            return;
        }

        alert("Pagamento deletado!");
        listarPagamentos(); // atualiza tabela

    } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Erro inesperado ao deletar.");
    }
}
