let deletReservRoomNumber = null;

const tableBody = document.querySelector(".reservations-table-body");
const dialogDeleteReserv = document.querySelector(".deleteReserv");
const deleteCancelBtn = document.querySelector(".cancelProssesForDeleteReserv");
const deleteConfirmBtn = document.querySelector(".confirmDeleteReserv");

tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("trashDelReserv")) {
    deletReservRoomNumber = e.target.getAttribute("data-set");
    dialogDeleteReserv.showModal();
  }
});

deleteCancelBtn.addEventListener("click", () => {
  dialogDeleteReserv.close();
});

deleteConfirmBtn.addEventListener("click", async () => {
  if (!deletReservRoomNumber) return;

  try {
    await fetch(`${config.API_URL}/reservas/${deletReservRoomNumber}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    dialogDeleteReserv.close();

  } catch (error) {
    console.error("Erro ao deletar reserva:", error);
  }
});