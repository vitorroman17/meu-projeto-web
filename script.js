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

    salvarEAtualizar();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarEAtualizar();
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
            ${item.nome} (x${item.quantidade}) - R$ ${subtotal.toFixed(2)}
            <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        lista.appendChild(li);
    });

    if (totalElemento) {
        totalElemento.innerText = total.toFixed(2).replace('.', ',');
    }
}

function efetivarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Compra realizada com sucesso!");
    carrinho = [];
    salvarEAtualizar();
}

async function carregarDepoimentos() {
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
}

document.addEventListener('DOMContentLoaded', () => {
    exibirCarrinho();
    carregarDepoimentos();
});