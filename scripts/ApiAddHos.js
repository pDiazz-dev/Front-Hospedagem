const btnAdd = document.querySelector(".btn-add");

btnAdd.addEventListener("click", function() {
    let dialog = document.getElementById("addHos");
    dialog.showModal()

});

const outDialog = document.getElementById("outDialog");
outDialog.addEventListener("click", function() {
        let dialog = document.getElementById("addHos");
        dialog.close();
    });

const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", () => {
    alert("Hóspede adicionado com sucesso!");
    let nomeHospede = document.getElementById("nomeHospede").value;
    let telefoneHospede = document.getElementById("telefoneHospede").value;
    let cpfHospede = document.getElementById("cpfHospede").value;
    fetch("")
    document.getElementById("addHos").close();
});