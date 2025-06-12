 fetch('http://localhost:8080/api/cargos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      addlinha(data);
    })
    .catch(error => {
      console.log(error);
    });

function salvarCadastro() {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;

  console.log("Dados do formulário:", {
    nome,
    descricao
  });

  if(nome && descricao){
    fetch('http://localhost:8080/api/cargos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"nome":nome, "descricao":descricao})
      })
        .then(response => response.json())
        .then(data => {
          console.log("Resposta da API:", data);
           addlinha([data]);
           alert ("Cadastro realizado com sucesso!")
        })
        .catch(error => {
          console.error("Erro ao enviar dados:", error);
        });
  } else {
    alert ("Erro: faltam dados para o cadastro.")
  }
}

document.getElementById("cadastro-cargo").addEventListener("submit", function(event) {
    event.preventDefault();
    salvarCadastro();
});

function addlinha(dadosAPI){
    const tabela = document.getElementById('tabela-cargos');
    dadosAPI.forEach(element => {
    const linha = document.createElement('tr');
    //Adicionando HTML
    linha.innerHTML = `
        <tr>
            <td class="px-4 py-2">${element.id}</td>
            <td class="px-4 py-2">${element.nome}</td>
            <td class="px-4 py-2">${element.descricao}</td>
            <td class="px-4 py-2"><button  class="bg-red-500 text-white px-2 py-1 rounded" onclick="remover(this)">Remover</button>
            <button class="bg-gray-400 text-white px-2 py-1 rounded mr-2" onclick="editar(this)">Editar</button></td>
        </tr>
    `;

    tabela.appendChild(linha);
    });
}

function remover(dadosbotao){
    Swal.fire({
        icon: 'question',
        title: 'Você tem certeza?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) => {
    if (result.isConfirmed) {
        const linharemover = dadosbotao.closest('tr');

        const cargoId = linharemover.querySelector('td').textContent.trim();

        //API DELETE 
        fetch(`http://localhost:8080/api/alunos/${cargoId}`,{
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
        }).then(response => {
        if (response.ok) {
            linharemover.remove();
            Swal.fire('Confirmado!', 'Aluno removido com sucesso', 'success');
        } else {
            Swal.fire('Erro!', 'Não foi possível remover o aluno', 'error');
        }
        })
        .catch(error => {
        console.error("Erro ao enviar dados:", error);
        });

        Swal.fire('Confirmado!', '', 'success');
    } else {
        Swal.fire('Cancelado', '', 'info');
    }
    });
}