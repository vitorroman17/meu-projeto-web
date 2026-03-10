export function mostrarAlerta(tipo, texto) {
  const div = document.createElement('div');
  div.className = `alert alert-${tipo} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
  div.style.zIndex = '1050';
  div.innerHTML = `${texto} <button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}
export function configurarModal() {
    const modal = document.getElementById('modalProduto');
    if (modal) {
        modal.addEventListener('show.bs.modal', function (event) {
            const botao = event.relatedTarget;
            const nome = botao.getAttribute('data-nome');
            const descricao = botao.getAttribute('data-descricao');
            const preco = botao.getAttribute('data-preco');

            document.getElementById('modalTitulo').textContent = nome;
            document.getElementById('modalCorpo').innerHTML = `
                <p><strong>Descrição:</strong> ${descricao}</p>
                <p><strong>Preço:</strong> R$ ${parseFloat(preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            `;
        });
    }
}

export function renderizarDepoimentos(data) {
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
      </div>
    `;
  });
}

export function exibirCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const totalElemento = document.getElementById('valor-total');
  let total = 0;
  if (!lista) return;
  lista.innerHTML = '';
  let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      ${item.nome} x${item.quantidade} - ${subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    lista.appendChild(li);
  });
  if (totalElemento) {
    totalElemento.innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}

