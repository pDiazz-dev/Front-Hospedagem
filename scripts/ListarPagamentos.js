function toast(message, type = "success") {
    const container = document.querySelector(".toastNotification");
    const toast = document.createElement("div");
    toast.classList.add("toast", type);
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

document.addEventListener("DOMContentLoaded", listarPagamentos);

async function listarPagamentos() {
    try {
        const response = await fetch("http://localhost:8080/pagamento");
        if (!response.ok) throw new Error();

        const pagamentos = await response.json();
        const tbody = document.querySelector("#finance-tbody");
        tbody.innerHTML = "";

        pagamentos.forEach(p => {
            const row = document.createElement("tr");

            const nomeHospede = p.reservas?.hospede?.nome ?? "Não informado";
            const valor = Number(p.valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

            row.innerHTML = `
                <td>${p.data}</td>
                <td><strong>${nomeHospede}</strong></td>
                <td>${valor}</td>
                <td class="text-center">
                    <button class="btn-delete" onclick="deletarPagamento('${p.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

    } catch (err) {
        toast("Erro ao carregar pagamentos", "error");
    }
}

let pagamentoSelecionado = null;

function deletarPagamento(id) {
    pagamentoSelecionado = id;
    const dialog = document.querySelector(".financeDelete");
    dialog.showModal();
    const btnConfirm = dialog.querySelector(".confirmProssesForDeleteFinance");
    const btnCancel = dialog.querySelector(".cancelDeleteFinance");
    btnConfirm.onclick = confirmarDeletePagamento;
    btnCancel.onclick = () => dialog.close();
}

async function confirmarDeletePagamento() {
    const dialog = document.querySelector(".financeDelete");

    try {
        const response = await fetch(`http://localhost:8080/pagamento/${pagamentoSelecionado}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            toast("Erro ao deletar pagamento", "error");
            dialog.close();
            return;
        }

        toast("Pagamento deletado!", "success");
        listarPagamentos();
        dialog.close();

    } catch (error) {
        toast("Erro inesperado ao deletar", "error");
        dialog.close();
    }
}

const dialogFinance = document.querySelector("#finance-dialog");
const btnOpenDialog = document.querySelector("#btn-open-dialog");
const btnCloseDialog = document.querySelector("#btn-cancelar");

btnOpenDialog.onclick = () => dialogFinance.showModal();
btnCloseDialog.onclick = () => dialogFinance.close();
