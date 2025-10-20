async function listarHospedes() {

    const tabelaBody = document.getElementById('guest-table-body');
    tabelaBody.innerHTML = '';

    const request = await fetch('http://localhost:8080/new-guest/hospedes')

    try {
    if (!request.ok) {
        console.error('Erro ao buscar hóspedes');
        return;
    }

    const hospedes = await request.json();
    const tabelaBody = document.getElementById('guest-table-body');

    hospedes.forEach(hospede => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${hospede.nome}</td>
            <td>${hospede.cpf}</td>
            <td>${hospede.telefone}</td>
        `;
        tabelaBody.appendChild(row);
    });

} catch (error) {
    console.error('Erro ao processar a lista de hóspedes:', error);
}
}

listarHospedes();