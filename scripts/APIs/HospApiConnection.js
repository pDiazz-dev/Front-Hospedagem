// Função para formatar nome
function formatarNomeCompleto(nome) {
  const excecoes = ['de', 'da', 'do', 'dos', 'das', 'e'];
  
  return nome
    .toLowerCase()
    .split(' ')
    .map(palavra => 
      excecoes.includes(palavra) ? palavra : palavra.charAt(0).toUpperCase() + palavra.slice(1)
    )
    .join(' ');
}



// Máscara CPF no input
const cpfInput = document.getElementById('cpfHospede');
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



// Máscara Telefone no input
const telefoneInput = document.getElementById('telefoneHospede');
if (telefoneInput) {
  telefoneInput.addEventListener('input', function () {
    this.value = this.value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
  });
}



// Evento de clique para salvar novo hóspede + validação dos campos
const CadNewHospede = document.getElementById('saveBtn');
let alertSucessBox = document.querySelector('.toastNotification');

function createToastNotification(type, text, icon, title) {
  const newToast = document.createElement('div');
  newToast.innerHTML = `
  <div class="toast ${type}">
  <i class="${icon}"></i>
  <div class="content">
  <div class="title">${title}</div>
  <span>${text}</span>
  </div>
  <i class="fa-solid fa-x" 
  onclick = "(this.parentElement).remove()"></i>
  </div>`;
  alertSucessBox.appendChild(newToast); 
  setTimeout(() => {
    alertSucessBox.removeChild(newToast);
  }, 4000);
}



CadNewHospede.addEventListener("click", () => {
  let nome = document.getElementById('nomeHospede').value.trim();
  let telefone = document.getElementById('telefoneHospede').value;
  let cpf = document.getElementById('cpfHospede').value
  if(telefone.length != 15){
    document.querySelector('.personalNumbQuantErr').style.display = 'block';
    return;
  }

  if(cpf.length != 14){
    document.querySelector('.personalCpfQuantErr').style.display = 'block';
    return;
  }
  if(nome.length <= 3){
    alert("O nome deve conter mais de 3 caracteres!");
    return;
  }

  if (nome === "" || telefone === "" || cpf === "") {
          let type = 'Algo deu errado!';
          let text = 'Verifique os campos e tente novamente!';
          let icon = 'fa-solid fa-circle-xmark';
          let title = 'Algo deu errado!';
          createToastNotification(type, text, icon, title);
 }
  if (/\d/.test(nome)) {
    document.querySelector('.personalNameQuantErr').style.display = 'block';
    return;
  }



//Conexão com a API para salvar novo hóspede
  nome = formatarNomeCompleto(nome);

  fetch(`${config.API_URL}/new-guest/sigin-guest`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, telefone, cpf })
  })

  // Tratamento de respostas da API
    .then(async (response) => {
      const body = null;
      try {
          body = await response.json();
      } catch (error) {
          console.warn("Resposta da API não é um JSON válido:", error);
      }
      return {
          status: response.status,
          body: body
      };
    }
    )
  
  
  
  .then(({ status, body }) => {
      if (status === 500) {

        let type = 'Erro';
  let text = 'Esse hóspede já está cadastrado!';
  let icon = 'fa-solid fa-circle-xmark';
  let title = 'Ocorreu um erro!';
  createToastNotification(type, text, icon, title);
        return;
      }

      if (status === 200) {
        
      let type = 'Sucesso';
  let text = 'Hóspede cadastrado com sucesso! Atualizando a página...';
  let icon = 'fa-solid fa-circle-check';
  let title = 'Sucesso';
  createToastNotification(type, text, icon, title);
      listarHospedes();
      return;
  }
  });
  
});
