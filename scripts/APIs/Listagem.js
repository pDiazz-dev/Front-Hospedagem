
let hospedes = [];

async function listarHospedes() {
    const tabelaBody = document.getElementById('guest-table-body');
    tabelaBody.innerHTML = '';

    try {
        const request = await fetch(`${config.API_URL}/hospede/hospedes-list`);
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
                <td><i class="fa-solid fa-pen-to-square penEdit" data-set = ${hospede.cpf}></i></td>
                <td><i class="fa-solid fa-trash-can trashDel " data-set = ${hospede.cpf}></i></td>
            `;
            tabelaBody.appendChild(row);
        });
        
    } catch (error) {
        console.error('Erro ao processar a lista de hóspedes:', error);
    }
}

listarHospedes();
