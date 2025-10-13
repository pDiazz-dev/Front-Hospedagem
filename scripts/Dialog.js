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