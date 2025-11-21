document.addEventListener("DOMContentLoaded", () => {
    carregarHospedes();
    configurarDialog();
    configurarFormulario();
});

const hospedeSelect = document.getElementById("pagamento-hospede");
const reservaSelect = document.getElementById("pagamento-reserva");

async function carregarHospedes() {
    try {
        const res = await fetch(`${config.API_URL}/hospede/hospedes-list`);
        if (!res.ok) {
            createToastNotification("Erro", "Falha ao carregar hóspedes!", "fa-solid fa-circle-xmark", "Erro");
            return;
        }

        const hospedes = await res.json();

        hospedes.forEach(h => {
            const op = document.createElement("option");
            op.value = h.cpf;
            op.textContent = `${h.nome} (${h.cpf})`;
            hospedeSelect.appendChild(op);
        });

    } catch (err) {
        console.error("Erro ao carregar hóspedes:", err);
        createToastNotification("Erro", "Erro de conexão ao carregar hóspedes!", "fa-solid fa-circle-xmark", "Erro");
    }
}

hospedeSelect.addEventListener("change", async () => {
    reservaSelect.innerHTML = "";
    reservaSelect.disabled = true;

    const cpf = hospedeSelect.value;
    if (!cpf) return;

    try {
        const res = await fetch(`${config.API_URL}/reservas/reservas-recentes`);
        if (!res.ok) {
            createToastNotification("Erro", "Falha ao carregar reservas!", "fa-solid fa-circle-xmark", "Erro");
            return;
        }

        const reservas = await res.json();

        reservas
            .filter(r => r.hospede.cpf === cpf)
            .forEach(r => {
                const op = document.createElement("option");

                op.value = JSON.stringify({
                    cpf: r.hospede.cpf,
                    quarto: r.quartos.numeroQuarto,
                    checkin: r.checkin
                });

                op.textContent = `Quarto ${r.quartos.numeroQuarto} — Check-in ${r.checkin}`;
                reservaSelect.appendChild(op);
            });

        reservaSelect.disabled = false;

    } catch (err) {
        console.error("Erro ao carregar reservas:", err);
        createToastNotification("Erro", "Erro de conexão ao carregar reservas!", "fa-solid fa-circle-xmark", "Erro");
    }
});

function configurarDialog() {
    const dialog = document.getElementById("finance-dialog");
    const openBtn = document.getElementById("btn-open-dialog");
    const cancelBtn = document.getElementById("btn-cancelar");

    openBtn.addEventListener("click", () => dialog.showModal());
    cancelBtn.addEventListener("click", () => dialog.close());
}

function configurarFormulario() {
    const form = document.getElementById("finance-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const r = JSON.parse(reservaSelect.value);

        const payload = {
            reservas: {
                hospedes: { cpf: r.cpf },
                quarto: { numeroQuarto: r.quarto },
                checkin: r.checkin
            },
            metodoPagamento: document.getElementById("finance-metodo").value,
            data: document.getElementById("finance-data").value,
            valor: Number(document.getElementById("finance-valor").value)
        };

        try {
            const res = await fetch(`${config.API_URL}/pagamento`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorBody = await res.json();
                createToastNotification(
                    "Erro",
                    errorBody.error || "Não foi possível registrar o pagamento!",
                    "fa-solid fa-circle-xmark",
                    "Erro!"
                );
                return;
            }

            createToastNotification(
                "Sucesso",
                "Pagamento registrado com sucesso!",
                "fa-solid fa-circle-check",
                "Sucesso"
            );
            setTimeout(() => window.location.reload(), 4000);
            document.getElementById("finance-dialog").close();

        } catch (err) {
            console.error("Erro ao enviar pagamento:", err);
            createToastNotification(
                "Erro",
                "Erro de conexão ao registrar pagamento!",
                "fa-solid fa-circle-xmark",
                "Erro!"
            );
        }
    });
}
