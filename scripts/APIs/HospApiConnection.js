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


const CadNewHospede = document.getElementById('saveBtn');
CadNewHospede.addEventListener("click", () =>{
    let nome = document.getElementById('nomeHospede').value.trim();
    let telefone = document.getElementById('telefoneHospede').value.replace(/\D/g, '');
    let cpf = document.getElementById('cpfHospede').value.replace(/\D/g, '');

    if(telefone.toString().length != 11 || isNaN(telefone)){
        document.querySelector('.personalNumbQuantErr').style.display = 'block';
        return;
    }
    

    if(cpf.toString().length != 11 || isNaN(cpf)){
        document.querySelector('.personalCpfQuantErr').style.display = 'block';
        return;
    }

    nome = formatarNomeCompleto(nome);


    fetch(`${config.API_URL}/new-guest/sigin-guest`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, telefone, cpf })
    })
    .then(response =>
        response.json().then(data => ({
            status: response.status,
            body: data
        }))
    )
    .then(({ status, body }) => {
        if (status === 500) {
            alert("Hóspede já cadastrado!");
        
    }})
    .then(({ status, body }) => {
        if (status === 400) {
            alert("Verifique os campos e tente novamente!");
        
    }})
});

