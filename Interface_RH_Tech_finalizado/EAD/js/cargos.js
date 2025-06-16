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
            <td class="px-4 py-2">
                <button onclick="remover(this)">Remover</button>
                <button onclick="editar(this)">Editar</button>
            </td>
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
        fetch(`http://localhost:8080/api/cargos/${cargoId}`,{
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
        }).then(response => {
        if (response.ok) {
            linharemover.remove();
            Swal.fire('Confirmado!', 'Cargo removido com sucesso', 'success');
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

function editar(dadosbotao) {
  const linhaEditar = dadosbotao.closest('tr');
  const id = linhaEditar.querySelector('td:nth-child(1)').textContent.trim();
  const nome = linhaEditar.querySelector('td:nth-child(2)').textContent.trim();
  const descricao = linhaEditar.querySelector('td:nth-child(3)').textContent.trim();

  Swal.fire({
    title: 'Editar Cargo',
    html:
      `<input id="swal-nome" class="swal2-input" placeholder="Nome" value="${nome}">` +
      `<input id="swal-descricao" class="swal2-input" placeholder="Descrição" value="${descricao}">`,
    showCancelButton: true,
    confirmButtonText: 'Salvar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const novoNome = document.getElementById('swal-nome').value;
      const novaDescricao = document.getElementById('swal-descricao').value;

      if (!novoNome || !novaDescricao) {
        Swal.showValidationMessage('Preencha todos os campos');
        return false;
      }

      return { nome: novoNome, descricao: novaDescricao };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:8080/api/cargos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: result.value.nome,
          descricao: result.value.descricao
        })
      })
      .then(response => {
        if (response.ok) {
          linhaEditar.querySelector('td:nth-child(2)').textContent = result.value.nome;
          linhaEditar.querySelector('td:nth-child(3)').textContent = result.value.descricao;

          Swal.fire('Atualizado!', 'Cargo atualizado com sucesso.', 'success');
        } else {
          Swal.fire('Erro!', 'Não foi possível atualizar o cargo.', 'error');
        }
      })
      .catch(error => {
        console.error("Erro ao atualizar:", error);
        Swal.fire('Erro!', 'Erro de comunicação com o servidor.', 'error');
      });
    }
  });
}