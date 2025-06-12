'use strict';

const limparFormulario = () => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.estado;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
  limparFormulario();

  const cep = document.getElementById('cep').value.replace("-", "");
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  if (cepValido(cep)){
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty('erro')){
    alert ("CEP não encontrado!")
  } else {
    preencherFormulario(endereco);
  }
  } else {
    alert ("CEP incorreto!")
  }
}

document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep);

function salvarCadastro() {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  if (senha.length < 6) {
    alert ("A senha é muito curta!")
    document.getElementById('senha').value = '';
    return;
  }
  const cep = document.getElementById('cep').value.replace("-", "");
  const endereco = document.getElementById('endereco').value;
  const numero = document.getElementById('numero').value;
  const bairro = document.getElementById('bairro').value;
  const cidade = document.getElementById('cidade').value;
  const estado = document.getElementById('estado').value;

  console.log("Dados do formulário:", {
    nome,
    email,
    senha,
    cep,
    endereco,
    numero,
    bairro,
    cidade,
    estado
  });


  if(nome && email && senha && cep && endereco && numero && bairro && cidade && estado){
    fetch('http://localhost:8080/api/funcionarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"nome":nome, "email":email, "senha":senha, "cep":cep,"endereco":endereco, "numero":numero, "bairro":bairro, "cidade":cidade, "estado":estado})
      })
        .then(response => response.json())
        .then(data => {
          console.log("Resposta da API:", data);
        })
        .catch(error => {
          console.error("Erro ao enviar dados:", error);
        });
    alert ("Cadastro realizado com sucesso!")
  } else {
    alert ("Erro: faltam dados para o cadastro.")
  }
}

document.getElementById("cadastro-funcionario").addEventListener("submit", function(event) {
    event.preventDefault();
    salvarCadastro();
});