// === HospApiConnection.js ===

// Função para formatar nome
function formatarNomeCompleto(nome) {
  const excecoes = ['de', 'da', 'do', 'dos', 'das', 'e'];
  return nome
    .toLowerCase()
    .split(' ')
    .map(p => excecoes.includes(p) ? p : p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

// Toast notification
const alertSucessBox = document.querySelector('.toastNotification');

function createToastNotification(type, text, icon, title) {
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
  alertSucessBox.appendChild(newToast);
  setTimeout(() => newToast.remove(), 4000);
}

// Máscaras CPF e Telefone
const cpfInput = document.getElementById('cpfHospede');
const telefoneInput = document.getElementById('telefoneHospede');

if (cpfInput) {
  cpfInput.addEventListener('input', function () {
    this.value = this.value
      .replace(/\D/g, '')
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
      .slice(0, 14);
  });
}

if (telefoneInput) {
  telefoneInput.addEventListener('input', function () {
    this.value = this.value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  });
}

// Salvar novo hóspede
const CadNewHospede = document.getElementById('saveBtn');

CadNewHospede.addEventListener("click", () => {
  let nome = document.getElementById('nomeHospede').value.trim();
  let telefone = document.getElementById('telefoneHospede').value;
  let cpf = document.getElementById('cpfHospede').value;

  // Esconde mensagens antigas
  document.querySelectorAll('.personalNumbQuantErr, .personalCpfQuantErr, .personalNameQuantErr, .personalNameQuantErrQuantity')
    .forEach(el => el.style.display = 'none');

  // Validações
  if (telefone.length < 15) {
    document.querySelector('.personalNumbQuantErr').style.display = 'block';
    return;
  }

  if (cpf.length < 14) {
    document.querySelector('.personalCpfQuantErr').style.display = 'block';
    return;
  }

  if (nome.length <= 3) {
    document.querySelector('.personalNameQuantErrQuantity').style.display = 'block';
    return;
  }

  if (/\d/.test(nome)) {
    document.querySelector('.personalNameQuantErr').style.display = 'block';
    return;
  }

  nome = formatarNomeCompleto(nome);

  fetch(`${config.API_URL}/hospede`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, telefone, cpf })
  })
    .then(async (response) => {
      let body = null;
      try {
        body = await response.json();
      } catch (error) {
        console.warn("Resposta da API não é um JSON válido:", error);
      }
      return { status: response.status, body };
    })
    .then(({ status }) => {
      if (status === 500) {
        createToastNotification('Erro', 'Esse hóspede já está cadastrado!', 'fa-solid fa-circle-xmark', 'Ocorreu um erro!');
        return;
      }

      if (status === 200) {
        createToastNotification('Sucesso', 'Hóspede cadastrado com sucesso!', 'fa-solid fa-circle-check', 'Sucesso');

        // Fecha o dialog
        const addHosDialog = document.getElementById('addHos');
        if (addHosDialog) addHosDialog.close();

        listarHospedes();

        setTimeout(() => window.location.reload(), 4000);
      }
    })
    .catch(err => {
      console.error("Erro ao salvar hóspede:", err);
      createToastNotification('Erro', 'Falha na conexão com o servidor!', 'fa-solid fa-circle-xmark', 'Erro!');
    });
});
