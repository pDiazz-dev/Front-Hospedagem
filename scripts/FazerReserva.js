document.addEventListener("DOMContentLoaded", () => {
    carregarHospedes();
    carregarQuartos();

    const formReserva = document.getElementById("formReserva");
    formReserva.addEventListener("submit", criarReserva);

    const openReservaBtn = document.querySelector(".btnGreenAddHospInTheRoom");
    if (openReservaBtn) {
        openReservaBtn.addEventListener("click", () => {
            document.getElementById("dialogReserva").showModal();
        });
    }

    const closeBtn = document.getElementById("closeReserva");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            document.getElementById("dialogReserva").close();
        });
    }

    const saveReserv = document.getElementById("btn-confirmReserva");
    if (saveReserv) {
        saveReserv.addEventListener("click", () => {
            document.getElementById("formReserva").requestSubmit();
        });
    }
});

async function carregarHospedes() {
    try {
        const response = await fetch(`${config.API_URL}/hospede/hospedes-list`);
        if (!response.ok) throw new Error();

        const hospedes = await response.json();
        const select = document.getElementById("hospedeSelect");

        select.innerHTML = `<option value="">Selecione...</option>`;

        hospedes.forEach(h => {
            const option = document.createElement("option");
            option.value = h.cpf;
            option.textContent = `${h.nome} – ${h.cpf}`;
            select.appendChild(option);
        });

    } catch (error) {
        toast("Erro ao carregar hóspedes!", "error");
    }
}

async function carregarQuartos() {
    try {
        const response = await fetch(`${config.API_URL}/quartos`);
        if (!response.ok) throw new Error();

        const quartos = await response.json();
        const select = document.getElementById("quartoSelect");

        select.innerHTML = `<option value="">Selecione...</option>`;

        quartos.forEach(q => {
            const option = document.createElement("option");
            option.value = q.numeroQuarto;
            option.textContent = `${q.tipoQuarto} – Nº ${q.numeroQuarto} – R$${q.valorQuarto}`;
            select.appendChild(option);
        });

    } catch (error) {
        toast("Erro ao carregar quartos!", "error");
    }
}

async function criarReserva(e) {
    e.preventDefault();

    const cpfHospede = document.getElementById("hospedeSelect").value;
    const numeroQuarto = Number(document.getElementById("quartoSelect").value);
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const numero = Number(document.getElementById("QuantitySelect").value);

    if (new Date(checkin) >= new Date(checkout)) {
        toast("Datas inválidas!", "error");
        return;
    }

    const reservaDTO = {
        numeroDePessoas: numero,
        checkin,
        checkout,
        hospede: { cpf: cpfHospede },
        quartos: { numeroQuarto }
    };

    try {
        const response = await fetch(`${config.API_URL}/reservas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reservaDTO)
        });

        if (!response.ok) throw new Error();

        toast("Reserva criada com sucesso!", "success");

        document.getElementById("dialogReserva").close();
        document.getElementById("formReserva").reset();

        setTimeout(() => location.reload(), 500);

    } catch (error) {
        toast("Erro ao criar reserva!", "error");
    }
}

function toast(msg, type = "info") {
    const div = document.querySelector(".toastNotification");
    if (!div) return;

    const t = document.createElement("div");
    t.className = `toast ${type}`;

    const icon = document.createElement("i");
    icon.className =
        type === "success" ? "fa-solid fa-circle-check" :
        type === "error"   ? "fa-solid fa-circle-xmark" :
                             "fa-solid fa-circle-info";

    const text = document.createElement("span");
    text.textContent = msg;

    t.appendChild(icon);
    t.appendChild(text);

    div.appendChild(t);

    setTimeout(() => t.remove(), 3000);
}
