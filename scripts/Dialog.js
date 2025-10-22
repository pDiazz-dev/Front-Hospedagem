const btnAdd = document.querySelector(".btn-add");
const addHosDialog = document.getElementById("addHos");
const outDialog = document.getElementById("outDialog");
const confirmCloseDialog = document.getElementById("confirmClose");
const confirmCancel = document.getElementById("confirmCancel");
const denyCancel = document.getElementById("denyCancel");
const salvarBtn = document.getElementById("saveBtn");

// Abrir o formulário de cadastro
btnAdd.addEventListener("click", function () {
    addHosDialog.showModal();
    
});

salvarBtn.addEventListener("click", function () {
    //Limpar os campos
    addHosDialog.close();
})

// Quando clicar em "Cancelar" → abrir confirmação
outDialog.addEventListener("click", function () {
    confirmCloseDialog.showModal();
    }

)

// Se clicar em "Sim" → fechar ambos os dialogs
confirmCancel.addEventListener("click", function () {
    confirmCloseDialog.close();
    addHosDialog.close();
})

// Se clicar em "Não" → apenas fecha a confirmação
denyCancel.addEventListener("click", function () {
    confirmCloseDialog.close();
})
