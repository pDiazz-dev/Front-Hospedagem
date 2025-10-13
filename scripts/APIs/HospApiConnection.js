const CadNewHospede = document.getElementById('saveBtn');
CadNewHospede.addEventListener("click", () =>{
    let nome = document.getElementById('nomeHospede').value.trim();
    let telefone = document.getElementById('telefoneHospede').value;
    let cpf = document.getElementById('cpfHospede').value;

    fetch(`${config.API_URL}/new-guest/sigin-guest`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify({
            nome, telefone, cpf
        })
    })
})