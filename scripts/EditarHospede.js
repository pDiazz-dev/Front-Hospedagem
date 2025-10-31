// === VARIÁVEIS GLOBAIS ===
let hospedeAtual = null;

// === ELEMENTOS DOM ===
const tabelaBody = document.getElementById('guest-table-body');
const editDialog = document.querySelector('.editGuest');
const inputNome = document.getElementById('editNomeHospede');
const inputTelefone = document.getElementById('editTelefoneHospede');
const inputCpf = document.getElementById('editCpfHospede'); // CPF será só leitura
const btnSalvar = document.getElementById('saveEditBtn');
const btnCancelar = document.getElementById('cancelEditBtn');

// === FUNÇÃO ABRIR MODAL E PREENCHER DADOS ===
function abrirModalEdicao(hospede) {
    hospedeAtual = hospede;

    inputNome.value = hospede.nome;
    inputTelefone.value = hospede.telefone;
    inputCpf.value = hospede.cpf;
    inputCpf.disabled = true; // CPF só leitura

    editDialog.showModal();
}

// === SALVAR EDIÇÃO (PATCH) ===
async function salvarEdicao() {
    if (!hospedeAtual) return;

    const dadosEditados = {
        cpf: hospedeAtual.cpf,
        nome: inputNome.value.trim(),
        telefone: inputTelefone.value.trim()
    };

    try {
        const response = await fetch(`${config.API_URL}/new-guest/update-guest`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosEditados)
        });

        if (!response.ok) {
            alert('Erro ao atualizar hóspede!');
            return;
        }

        editDialog.close();
        hospedeAtual = null;

        // Atualiza tabela chamando a função global de listagem
        if (typeof listarHospedes === "function") {
            listarHospedes();
        }

    } catch (err) {
        console.error('Erro ao atualizar hóspede:', err);
        alert('Falha na conexão com o servidor!');
    }
}

// === CANCELAR EDIÇÃO ===
btnCancelar.addEventListener('click', () => {
    editDialog.close();
    hospedeAtual = null;
});

// === EVENTO DE CLIQUE NA TABELA PARA EDITAR ===
tabelaBody.addEventListener('click', (e) => {
    const penEdit = e.target.closest('.penEdit');
    if (!penEdit) return;

    const cpf = penEdit.dataset.cpf;
    if (!cpf || !Array.isArray(hospedes)) return;

    const hospede = hospedes.find(h => h.cpf === cpf);
    if (hospede) abrirModalEdicao(hospede);
});

// === BOTÃO SALVAR ===
btnSalvar.addEventListener('click', salvarEdicao);
