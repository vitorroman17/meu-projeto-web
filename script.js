let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarAoCarrinho(nome, preco, idQuantidade) {
    const quantidade = parseInt(document.getElementById(idQuantidade).value);
    
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({ nome, preco, quantidade });
    }

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

    totalElemento.innerText = total.toFixed(2).replace('.', ',');
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

document.addEventListener('DOMContentLoaded', exibirCarrinho);