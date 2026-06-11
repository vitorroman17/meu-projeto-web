import { carregarDepoimentos, enviarFormularioContato } from "./api.ts";
import {
  mostrarAlerta,
  renderizarDepoimentos,
  exibirCarrinho,
  inicializarToggleTema,
} from "./ui.ts";
import type { ItemCarrinho, DadosContato } from "./tipos.ts";

let carrinho: ItemCarrinho[] = JSON.parse(
  localStorage.getItem("carrinho") ?? "[]",
);

function adicionarAoCarrinho(
  nome: string,
  preco: number,
  idQuantidade: string,
): void {
  const inputQtd = document.getElementById(idQuantidade) as HTMLInputElement;
  const quantidade = parseInt(inputQtd.value);
  const itemExistente = carrinho.find((item) => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    carrinho.push({ nome, preco, quantidade });
  }

  inputQtd.value = "1";
  mostrarAlerta("success", `${nome} adicionado ao carrinho!`);
  salvarEAtualizar();
}

function removerDoCarrinho(index: number): void {
  if (confirm("Deseja remover este item do carrinho?")) {
    carrinho.splice(index, 1);
    salvarEAtualizar();
  }
}

function salvarEAtualizar(): void {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  exibirCarrinho();
}

function efetivarCompra(): void {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  mostrarAlerta("info", "Compra realizada com sucesso!");
  carrinho = [];
  salvarEAtualizar();
}

async function handleFormContato(e: SubmitEvent): Promise<void> {
  e.preventDefault();
  const dados: DadosContato = {
    nome: (document.getElementById("nome") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
    mensagem: (document.getElementById("mensagem") as HTMLTextAreaElement)
      .value,
  };
  const sucesso = await enviarFormularioContato(dados);
  mostrarAlerta(
    sucesso ? "success" : "danger",
    sucesso ? "Mensagem enviada com sucesso!" : "Erro ao enviar mensagem.",
  );
  if (sucesso) (e.target as HTMLFormElement).reset();
}

inicializarToggleTema();
exibirCarrinho();

carregarDepoimentos().then(renderizarDepoimentos);

const formContato = document.getElementById("form-contato");
if (formContato) {
  formContato.addEventListener("submit", handleFormContato);
}

window.adicionarAoCarrinho = adicionarAoCarrinho;
window.removerDoCarrinho = removerDoCarrinho;
window.efetivarCompra = efetivarCompra;
