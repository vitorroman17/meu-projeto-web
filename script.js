let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarAoCarrinho(nome, preco, idQuantidade) {
    const inputQtd = document.getElementById(idQuantidade);
    const quantidade = parseInt(inputQtd.value);
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({ nome, preco, quantidade });
    }

    inputQtd.value = 1;

    const alerta = document.createElement('div');
    alerta.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
    alerta.style.zIndex = '1050';
    alerta.innerHTML = `<strong>${nome}</strong> adicionado ao carrinho! <button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), 2000);

    salvarEAtualizar();
}

function removerDoCarrinho(index) {
    if (confirm("Deseja remover este item do carrinho?")) {
        carrinho.splice(index, 1);
        salvarEAtualizar();
    }
}

function salvarEAtualizar() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

function exibirCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    const totalElemento = document.getElementById('valor-total');
    let total = 0;

    if (!lista) return;
    lista.innerHTML = '';

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${item.nome} (x${item.quantidade}) - ${subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        lista.appendChild(li);
    });

    if (totalElemento) {
        totalElemento.innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
}

function efetivarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const alerta = document.createElement('div');
    alerta.className = 'alert alert-info alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
    alerta.style.zIndex = '1050';
    alerta.innerHTML = `Compra realizada com sucesso! <button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), 3000);

    carrinho = [];
    salvarEAtualizar();
}

async function carregarDepoimentos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');
        const data = await response.json();
        const lista = document.getElementById('lista-depoimentos');

        if (!lista) return;
        lista.innerHTML = '';

        data.forEach(item => {
            lista.innerHTML += `
                <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                        <div class="card-body">
                            <h5>${item.name.split(' ')[0]}</h5>
                            <p>${item.body.slice(0, 80)}...</p>
                        </div>
                    </div>
                </div>`;
        });
    } catch (error) {
        console.error("Erro ao carregar depoimentos:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    exibirCarrinho();
    carregarDepoimentos();
});

async function enviarFormularioContato(e) {
  e.preventDefault();

  const dados = { 
    nome: document.getElementById('nome').value, 
    email: document.getElementById('email').value, 
    mensagem: document.getElementById('mensagem').value 
  };

  try {
    const r = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    }); 

    const ok = r.status === 201;
    mostrarAlerta(ok ? 'success' : 'danger',
                  ok ? 'Mensagem enviada com sucesso!' : 'Erro ao enviar mensagem.');
    if (ok) e.target.reset();
  } catch {
    mostrarAlerta('danger', 'Erro ao enviar mensagem.');
  }
}

function mostrarAlerta(tipo, texto) {
  const div = document.createElement('div');
  div.className = `alert alert-${tipo} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
  div.style.zIndex = '1050';
  div.innerHTML = `${texto} <button type="button" class="btn-close" data-bs-dismiss="alert"></button>`; 
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    exibirCarrinho();
    carregarDepoimentos();
    
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', enviarFormularioContato);
    }
});