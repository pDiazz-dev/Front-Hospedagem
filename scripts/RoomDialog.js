document.addEventListener("DOMContentLoaded", () => {
  const dialogRoom = document.getElementById("roomDialog");
  const openDialogRoomBtn = document.getElementById("openRoomDialog");
  const cancelRoomBtn = document.getElementById("closeQuarto");
  const formQuarto = document.getElementById("formQuarto");
  const alertSucessBoxRoom = document.querySelector('.toastNotification') || document.body;
  function createToastNotificationRoom(type, text, icon, title) {
    const newToast = document.createElement('div');
    newToast.innerHTML = `
      <div class="toast ${type}">
        <i class="${icon}"></i>
        <div class="content">
          <div class="title">${title}</div>
          <span>${text}</span>
        </div>
        <i class="fa-solid fa-x"></i>
      </div>
    `;
    const toastElem = newToast.firstElementChild;
    const closeBtn = toastElem.querySelector('.fa-x');
    closeBtn.addEventListener('click', () => toastElem.remove());
    alertSucessBoxRoom.appendChild(toastElem);
    setTimeout(() => toastElem.remove(), 4000);
  }

  if (!dialogRoom || !openDialogRoomBtn || !cancelRoomBtn || !formQuarto) {
    return;
  }

  const tipoQuartoInput = document.getElementById("tipoQuarto");
  const valorDiariaInput = document.getElementById("valorDiaria");

  tipoQuartoInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[0-9]/g, "");
  });

  valorDiariaInput.addEventListener("input", (e) => {
    let v = e.target.value;
    v = v.replace(/,/g, "."); // todas as vírgulas para ponto
    v = v.replace(/[^0-9.]/g, ""); // remove tudo que não é número ou ponto
    const parts = v.split(".");
    if (parts.length > 1) {
      const integer = parts.shift();
      const decimals = parts.join(""); // junta qualquer ponto extra removendo-os
      v = integer + "." + decimals;
    } else {
      v = parts[0];
    }
    e.target.value = v;
  });

  openDialogRoomBtn.addEventListener("click", () => dialogRoom.showModal());
  cancelRoomBtn.addEventListener("click", () => dialogRoom.close());

  formQuarto.addEventListener("submit", async (e) => {
    e.preventDefault();
    const numeroQuarto = document.getElementById("numeroQuarto").value.trim();
    const tipoQuarto = tipoQuartoInput.value.trim();
    const valorDiaria = valorDiariaInput.value.trim();

    if (!numeroQuarto || !tipoQuarto || !valorDiaria) {
      createToastNotificationRoom('Erro', 'Preencha todos os campos!', 'fa-solid fa-circle-exclamation', 'Atenção');
      return;
    }

    const data = {
      numeroQuarto: Number(numeroQuarto),
      tipoQuarto,
      valorQuarto: parseFloat(valorDiaria),
      ativo: true
    };

    try {
      const response = await fetch(`${config.API_URL}/quartos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        createToastNotificationRoom('Sucesso', 'Quarto cadastrado com sucesso!', 'fa-solid fa-circle-check', 'Sucesso');
        dialogRoom.close();
        listarQuartos();
      } if (response.status === 409) {
        createToastNotificationRoom('Erro', 'Esse número de quarto já está cadastrado!', 'fa-solid fa-circle-xmark', 'Erro');

      }
    } catch (error) {
      createToastNotificationRoom('Erro', 'Falha na conexão com o servidor!', 'fa-solid fa-wifi', 'Erro de conexão');
    }
  });
});
