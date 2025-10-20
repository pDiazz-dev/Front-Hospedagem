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



    then(async (response) => {
     let body = null;
     try {
    body = await response.json();
  } catch (err) {
    console.warn("Resposta não era JSON válido:", err);
  }

  return {
    status: response.status,
    body: body
  };
})


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
          alert("Hóspede já cadastrado!");
        return;
      }
      if (status === 400) {
          alert("Verifique os campos e tente novamente!");
          return;
      }

      if (status === 200) {
      alert("Hóspede cadastrado com sucesso!");
      window.location.reload();
      return;
  }
  });
  
});
