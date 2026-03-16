export async function carregarDepoimentos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao carregar depoimentos:", error);
        return [];
    }
}

export async function enviarFormularioContato(dados) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        return response.status === 201;
    } catch (error) {
        console.error("Erro ao enviar formulário:", error);
        return false;
    }
}
export async function inicializarListenersCEP() {
    const cepInput = document.getElementById('cep');
    
    if (!cepInput) return;

    cepInput.addEventListener('blur', async function() {
        const cep = this.value.replace(/\D/g, '');
        
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                
                if (!data.erro) {
                    document.getElementById('rua').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                } else {
                    alert('CEP não encontrado.');
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
                alert('Ocorreu um erro ao buscar o CEP. Verifique sua conexão.');
            }
        } else if (cep.length > 0) {
            alert('Formato de CEP inválido. Digite 8 números.');
        }
    });
}