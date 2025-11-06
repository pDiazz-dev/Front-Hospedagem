// === EditHospConnection.js ===
document.addEventListener("DOMContentLoaded", () => {

  const alertSucessBoxEdit = document.querySelector('.toastNotification');

  function createToastNotificationEdit(type, text, icon, title) {
    const newToast = document.createElement('div');
    newToast.innerHTML = `
      <div class="toast ${type}">
        <i class="${icon}"></i>
        <div class="content">
          <div class="title">${title}</div>
          <span>${text}</span>
        </div>
        <i class="fa-solid fa-x" onclick="(this.parentElement).remove()"></i>
      </div>
    `;
    alertSucessBoxEdit.appendChild(newToast);
    setTimeout(() => newToast.remove(), 4000);
  }

  function formatarNomeCompleto(nome) {
    const excecoes = ['de', 'da', 'do', 'dos', 'das', 'e'];
    return nome
      .toLowerCase()
      .split(' ')
      .map(p => excecoes.includes(p) ? p : p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ');
  }

  const tableBody = document.getElementById('guest-table-body');
  let cpfSelecionado = null;

  if (tableBody) {
    tableBody.addEventListener("click", (e) => {
      if (e.target.classList.contains("penEdit")) {
        cpfSelecionado = e.target.getAttribute("data-set");
        const dialogEditHosp = document.querySelector(".editGuest");
        if (dialogEditHosp) dialogEditHosp.showModal();

        const cancelBtn2 = document.getElementById("cancelEditBtn");
        if (cancelBtn2) {
          cancelBtn2.addEventListener("click", () => {
            dialogEditHosp.close();
          });
        }
      }
    });
  }

  const telefoneInput = document.getElementById("editTelefoneHospede");
  if (telefoneInput) {
    telefoneInput.addEventListener("input", function () {
      this.value = this.value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
    });
  }

  const saveEditBtn2 = document.getElementById("saveEditBtn");
  if (saveEditBtn2) {
    saveEditBtn2.addEventListener("click", async () => {
      let editNomeHospede = document.getElementById("editNomeHospede").value.trim();
      let editTelefoneHospede = document.getElementById("editTelefoneHospede").value;

      document.querySelectorAll('.personalNumbQuantErr, .personalNameQuantErr, .personalNameQuantErrQuantity')
        .forEach(el => el.style.display = 'none');

      if (editTelefoneHospede && editTelefoneHospede.length < 15) {
        document.querySelector('.personalNumbQuantErr').style.display = 'block';
        return;
      }

      if (editNomeHospede && editNomeHospede.length <= 3) {
        document.querySelector('.personalNameQuantErrQuantity').style.display = 'block';
        return;
      }

      if (/\d/.test(editNomeHospede)) {
        document.querySelector('.personalNameQuantErr').style.display = 'block';
        return;
      }

      if (editNomeHospede) editNomeHospede = formatarNomeCompleto(editNomeHospede);

      try {
        const response = await fetch(`${config.API_URL}/new-guest/update-guest`, {
          method: "PATCH",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cpf: cpfSelecionado,
            nome: editNomeHospede || null,
            telefone: editTelefoneHospede || null
          })
        });

        const body = await response.json().catch(() => ({}));

        if (response.status === 500) {
          createToastNotificationEdit('Erro', 'Não foi possível atualizar o hóspede!', 'fa-solid fa-circle-xmark', 'Erro');
          return;
        }

        if (response.ok) {
          createToastNotificationEdit('Sucesso', 'Hóspede atualizado com sucesso!', 'fa-solid fa-circle-check', 'Sucesso');
          const dialogEditHosp = document.querySelector(".editGuest");
          if (dialogEditHosp) dialogEditHosp.close();
            listarHospedes();
        }
      } catch (error) {
        console.error("Erro ao atualizar hóspede:", error);
        createToastNotificationEdit('Erro', 'Falha na conexão com o servidor!', 'fa-solid fa-circle-xmark', 'Erro');
      }
    });
  }
});
