let hospedes = []; // variável global

async function listarHospedes() {
    const tabelaBody = document.getElementById('guest-table-body');
    tabelaBody.innerHTML = '';

    try {
        const request = await fetch(`${config.API_URL}/new-guest/hospedes`);
        if (!request.ok) {
            console.error('Erro ao buscar hóspedes');
            return;
        }

        hospedes = await request.json();

        hospedes.forEach(hospede => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${hospede.nome}</td>
                <td>${hospede.telefone}</td>
                <td>${hospede.cpf}</td>
                <td><i class="fa-solid fa-pen-to-square penEdit" data-cpf="${hospede.cpf}"></i></td>
                <td><i class="fa-solid fa-trash-can"></i></td>
            `;
            tabelaBody.appendChild(row);
        });

    } catch (error) {
        console.error('Erro ao processar a lista de hóspedes:', error);
    }
}

listarHospedes();
