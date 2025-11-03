
// É necessario percorrer os elementos da tabela para adicionar o evento de click em cada botão de editar
const tableBody = document.getElementById('guest-table-body');

let cpfSelecionado = null;
tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("penEdit")){
        const dialogEditHosp = document.querySelector(".editGuest");
        dialogEditHosp.showModal();

        cpfSelecionado = e.target.getAttribute("data-cpf");
    }
})  

const saveEditBtn2 = document.getElementById("saveEditBtn");
saveEditBtn2.addEventListener("click", async () => {
    const editNomeHospede = document.getElementById("editNomeHospede").value.trim();
    const editTelefoneHospede = document.getElementById("editTelefoneHospede").value;

    

    // Requesição para atualizar hospede

    try{
    await fetch(`${config.API_URL}/new-guest/update-guest`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({cpfSelecionado, editNomeHospede, editTelefoneHospede})
        
        
    })
}catch(error){
        console.error("Erro ao atualizar hóspede:", error);
    }
    
})
