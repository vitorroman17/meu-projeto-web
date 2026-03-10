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