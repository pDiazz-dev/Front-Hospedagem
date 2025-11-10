let deleteCpf = null;

const tableBody = document.getElementById("guest-table-body");
const dialogDeleteHosp = document.querySelector(".deleteGuest");
const deleteCancelBtn = document.querySelector(".cancelDeleteHospede");
const deleteConfirmBtn = document.querySelector(".confirmProssesForDeleteHopede");


tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("trashDel")) {
    deleteCpf = e.target.getAttribute("data-set");
    dialogDeleteHosp.showModal();
  }
});


deleteCancelBtn.addEventListener("click", () => {
  dialogDeleteHosp.close();
});


deleteConfirmBtn.addEventListener("click", async () => {
  if (!deleteCpf) return;

  try {
    await fetch(`${config.API_URL}/new-guest/delete-guest/${deleteCpf}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    dialogDeleteHosp.close();
    window.location.reload();
  } catch (error) {
    console.error("Erro ao deletar hóspede:", error);
  }
});
