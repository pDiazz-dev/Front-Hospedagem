
// É necessario percorrer os elementos da tabela para adicionar o evento de click em cada botão de editar
const tableBody = document.getElementById('guest-table-body');

let cpfSelecionado = null;
tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("penEdit")){
        const btn = e.target.closest(".penEdit")
        const dialogEditHosp = document.querySelector(".editGuest");
        dialogEditHosp.showModal();
        
        cpfSelecionado = e.target.getAttribute("data-set");
    }
})  

const saveEditBtn2 = document.getElementById("saveEditBtn");
saveEditBtn2.addEventListener("click", async () => {
    let editNomeHospede = document.getElementById("editNomeHospede").value.trim();
    let editTelefoneHospede = document.getElementById("editTelefoneHospede").value;

    if(editNomeHospede == ""){
        editNomeHospede = null
    }
    if( editTelefoneHospede == ""){
        editTelefoneHospede = null
    }

    // Requesição para atualizar hospede

    try{
    await fetch(`${config.API_URL}/new-guest/update-guest`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({cpf: cpfSelecionado,
            nome: editNomeHospede, 
            telefone: editTelefoneHospede})

        
        
    })
}catch(error){
        console.error("Erro ao atualizar hóspede:", error);
    }
    
})
