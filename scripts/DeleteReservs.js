let deletReservRoomNumber = null;
let deletReservCpf = null;
let deletReservCheckin = null;

const tableBody = document.querySelector(".reservations-table-body");
const dialogDeleteReserv = document.querySelector(".deleteReserv");
const deleteCancelBtn = document.querySelector(".cancelProssesForDeleteReserv");
const deleteConfirmBtn = document.querySelector(".confirmDeleteReserv");

tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("trashDelReserv")) {
       deletReservCheckin = e.target.getAttribute("data-checkin");
       deletReservCpf = e.target.getAttribute("data-cpf");
       deletReservRoomNumber = e.target.getAttribute("data-numero-quarto");
        dialogDeleteReserv.showModal();
    }
});

deleteCancelBtn.addEventListener("click", () => {
    dialogDeleteReserv.close();
});

deleteConfirmBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    
    try {
        const response = await fetch(
            `${config.API_URL}/reservas/${deletReservRoomNumber}/${deletReservCpf}/${deletReservCheckin}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            console.error("Erro do servidor:", await response.text());
            return;
        }

        dialogDeleteReserv.close();
    } catch (error) {
        console.error("Erro ao deletar reserva:", error);
    }
});
