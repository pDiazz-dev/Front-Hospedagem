// === Dialog.js ===

// Referências aos elementos
const btnAdd = document.querySelector(".btn-add");
const addHosDialog = document.getElementById("addHos");
const outDialog = document.getElementById("outDialog");
const confirmCloseDialog = document.getElementById("confirmClose");
const confirmCancel = document.getElementById("confirmCancel");
const denyCancel = document.getElementById("denyCancel");
const openEditDialog = document.querySelector(".penEdit");
const editDialog = document.querySelector(".editGuest");

// Abre o formulário de cadastro
btnAdd.addEventListener("click", function () {
  addHosDialog.showModal();
});

// Cancelar cadastro
outDialog.addEventListener("click", function () {
  const nome = document.getElementById("nomeHospede").value.trim();
  const cpf = document.getElementById("cpfHospede").value.trim();
  const telefone = document.getElementById("telefoneHospede").value.trim();

  // Se estiver vazio, apenas fecha
  if (cpf === "" && nome === "" && telefone === "") {
    addHosDialog.close();
    return;
  }

  confirmCloseDialog.showModal();
});

confirmCancel.addEventListener("click", function () {
  confirmCloseDialog.close();
  addHosDialog.close();
});

denyCancel.addEventListener("click", function () {
  confirmCloseDialog.close();
});

const saveEditBtn = document.getElementById("saveEditBtn");
saveEditBtn.addEventListener("click", async () => {
  const editNomeHospede = document.getElementById("editNomeHospede").value.trim();
  const editTelefoneHospede = document.getElementById("editTelefoneHospede").value.trim();
})

  
