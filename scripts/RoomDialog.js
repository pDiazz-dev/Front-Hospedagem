document.addEventListener("DOMContentLoaded", () => {
    const dialogRoom = document.getElementById("roomDialog");
    const openDialogRoomBtn = document.getElementById("openRoomDialog");
    const cancelRoomBtn = document.getElementById("closeQuarto");
    const formQuarto = document.getElementById("formQuarto");

    if (openDialogRoomBtn) {
        openDialogRoomBtn.addEventListener("click", () => {
            dialogRoom.showModal();
        });
    }

    if (cancelRoomBtn) {
        cancelRoomBtn.addEventListener("click", () => {
            dialogRoom.close();
        });
    }

    formQuarto.addEventListener("submit", async (e) => {
        e.preventDefault();

        const numero = document.getElementById("numeroQuarto").value;
        const tipo = document.getElementById("tipoQuarto").value;

        const quarto = {
            numeroQuarto: numero,
            tipoQuarto: tipo,
            ativo: true
        };

        try {
            const response = await fetch("http://localhost:8080/quartos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(quarto)
            });

            if (!response.ok) {
                throw new Error("Erro ao salvar quarto");
            }

            window.location.reload();
            dialogRoom.close();
            formQuarto.reset();
            carregarQuartos();
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao cadastrar o quarto!");
        }
    });
});
