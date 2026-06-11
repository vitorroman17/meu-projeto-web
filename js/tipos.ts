// Tipos compartilhados do projeto Tech Store

// Item guardado no carrinho (localStorage)
export interface ItemCarrinho {
  nome: string;
  preco: number;
  quantidade: number;
}

// Depoimento vindo da API (jsonplaceholder /comments)
export interface Depoimento {
  id: number;
  name: string;
  email: string;
  body: string;
}

// Dados enviados pelo formulário de contato
export interface DadosContato {
  nome: string;
  email: string;
  mensagem: string;
}

// Resposta da API ViaCEP
export interface RespostaViaCEP {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

// Temas disponíveis — union type (feature do TypeScript)
export type NomeTema = "dark" | "light" | "ocean" | "sunset";

// Tipo do alerta exibido na tela (classes do Bootstrap)
export type TipoAlerta = "success" | "danger" | "info" | "warning";

// Funções expostas no objeto global window (chamadas via onclick no HTML)
declare global {
  interface Window {
    adicionarAoCarrinho: (
      nome: string,
      preco: number,
      idQuantidade: string,
    ) => void;
    removerDoCarrinho: (index: number) => void;
    efetivarCompra: () => void;
  }
}
