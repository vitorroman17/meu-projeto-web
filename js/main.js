import { carregarDepoimentos, enviarFormularioContato } from './api.js';
import { mostrarAlerta, renderizarDepoimentos, exibirCarrinho } from './ui.js';

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
  mostrarAlerta('success', `${nome} adicionado ao carrinho!`);
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

function efetivarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  mostrarAlerta('info', 'Compra realizada com sucesso!');
  carrinho = [];
  salvarEAtualizar();
}

async function handleFormContato(e) {
  e.preventDefault();
  const dados = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    mensagem: document.getElementById('mensagem').value
  };
  const sucesso = await enviarFormularioContato(dados);
  mostrarAlerta(sucesso ? 'success' : 'danger',
    sucesso ? 'Mensagem enviada com sucesso!' : 'Erro ao enviar mensagem.');
  if (sucesso) e.target.reset();
}

document.addEventListener('DOMContentLoaded', async () => {
    exibirCarrinho();
    const depoimentos = await carregarDepoimentos();
    renderizarDepoimentos(depoimentos);

    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', handleFormContato);
    }
});

window.adicionarAoCarrinho = adicionarAoCarrinho;
window.removerDoCarrinho = removerDoCarrinho;
window.efetivarCompra = efetivarCompra;
