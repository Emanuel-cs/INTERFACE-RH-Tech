function salvarCadastro() {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  if (email && senha) {

    fetch(`http://localhost:8080/api/funcionarios/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email":email, "senha":senha, "cep":cep,"endereco":endereco, "bairro":bairro, "cidade":cidade, "estado":estado, "numero":numero})
      })
        .then(response => response.json())
        .then(data => {
          console.log("Resposta da API:", data);
        })
        .catch(error => {
          console.error("Erro ao enviar dados:", error);
        });
    Swal.fire({
      icon: 'success',
      title: 'Cadastro realizado com sucesso!',
      text: 'Funcionário cadastrado com sucesso!'
    });
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'Falta dados para cadastar'
    });
  }
}

document.getElementById("login-funcionario").addEventListener("submit", function(event) {
    event.preventDefault();
    salvarCadastro();
});