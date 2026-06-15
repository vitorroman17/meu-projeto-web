import { useState } from "react";

const PRODUTOS = [
  {
    id: 1,
    nome: "Teclado Gamer",
    descricao: "Teclado mecânico com RGB",
    preco: 200.0,
    img: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    nome: "Mouse Gamer",
    descricao: "Mouse com precisão alta e DPI ajustável",
    preco: 150.0,
    img: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    nome: "Headset Gamer",
    descricao: "Headset com som surround 7.1",
    preco: 250.0,
    img: "https://picsum.photos/300/200?random=3",
  },
];

export default function Produtos({ carrinho, onSalvarCarrinho }) {
  const [qtds, setQtds] = useState({ 1: 1, 2: 1, 3: 1 });
  const [modal, setModal] = useState(null);
  const [alerta, setAlerta] = useState(null);

  function mostrarAlerta(tipo, texto) {
    setAlerta({ tipo, texto });
    setTimeout(() => setAlerta(null), 3000);
  }

  function adicionarAoCarrinho(produto) {
    const copia = [...carrinho];
    const existente = copia.find((i) => i.nome === produto.nome);
    if (existente) {
      existente.quantidade += qtds[produto.id];
    } else {
      copia.push({
        nome: produto.nome,
        preco: produto.preco,
        quantidade: qtds[produto.id],
      });
    }
    setQtds((prev) => ({ ...prev, [produto.id]: 1 }));
    onSalvarCarrinho(copia);
    mostrarAlerta("success", `${produto.nome} adicionado ao carrinho!`);
  }

  function removerDoCarrinho(index) {
    const copia = [...carrinho];
    copia.splice(index, 1);
    onSalvarCarrinho(copia);
  }

  function efetivarCompra() {
    if (carrinho.length === 0) {
      mostrarAlerta("warning", "Seu carrinho está vazio!");
      return;
    }
    mostrarAlerta("info", "Compra realizada com sucesso!");
    onSalvarCarrinho([]);
  }

  const total = carrinho.reduce((acc, i) => acc + i.preco * i.quantidade, 0);

  return (
    <>
      {alerta && (
        <div
          className={`alert alert-${alerta.tipo} position-fixed top-0 start-50 translate-middle-x mt-3`}
          style={{ zIndex: 1050 }}
        >
          {alerta.texto}
        </div>
      )}

      <div className="container">
        <div className="row mt-5">
          {PRODUTOS.map((produto) => (
            <div key={produto.id} className="col-md-4">
              <div className="card">
                <img
                  src={produto.img}
                  className="card-img-top"
                  alt={produto.nome}
                />
                <div className="card-body">
                  <h5 className="card-title">{produto.nome}</h5>
                  <p className="card-text">{produto.descricao}</p>
                  <p className="fw-bold">
                    {produto.preco.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <input
                    type="number"
                    className="form-control mb-2"
                    value={qtds[produto.id]}
                    min="1"
                    onChange={(e) =>
                      setQtds((prev) => ({
                        ...prev,
                        [produto.id]: parseInt(e.target.value),
                      }))
                    }
                  />
                  <button
                    className="btn btn-success w-100 mb-2"
                    onClick={() => adicionarAoCarrinho(produto)}
                  >
                    Adicionar ao Carrinho
                  </button>
                  <button
                    className="btn btn-info w-100"
                    onClick={() => setModal(produto)}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <h3>Seu Carrinho</h3>
        <ul className="list-group mb-3">
          {carrinho.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.nome} x{item.quantidade} -{" "}
              {(item.preco * item.quantidade).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removerDoCarrinho(index)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
        <div className="alert alert-info text-center">
          <h4>
            Valor Total:{" "}
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </h4>
        </div>
        <button className="btn btn-primary w-100 mb-5" onClick={efetivarCompra}>
          Efetivar Compra
        </button>
      </div>

      {modal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setModal(null)}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modal.nome}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModal(null)}
                />
              </div>
              <div className="modal-body">
                <p>
                  <strong>Descrição:</strong> {modal.descricao}
                </p>
                <p>
                  <strong>Preço:</strong>{" "}
                  {modal.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModal(null)}
                >
                  Fechar
                </button>
                <button className="btn btn-primary">Comprar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
