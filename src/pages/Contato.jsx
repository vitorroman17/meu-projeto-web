import { useState } from "react";
import { enviarFormularioContato } from "../api.js";

const CAMPOS = [
  { id: "nome", label: "Nome", type: "text", placeholder: "Digite seu nome" },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Digite seu email",
  },
  {
    id: "cep",
    label: "CEP",
    type: "text",
    placeholder: "Digite seu CEP",
    isCep: true,
  },
  { id: "rua", label: "Rua", type: "text", placeholder: "Digite sua rua" },
  {
    id: "bairro",
    label: "Bairro",
    type: "text",
    placeholder: "Digite seu bairro",
  },
  {
    id: "cidade",
    label: "Cidade",
    type: "text",
    placeholder: "Digite sua cidade",
  },
  {
    id: "estado",
    label: "Estado",
    type: "text",
    placeholder: "Digite seu estado",
  },
];

const FORM_INICIAL = {
  nome: "",
  email: "",
  cep: "",
  rua: "",
  bairro: "",
  cidade: "",
  estado: "",
  mensagem: "",
};

export default function Contato() {
  const [form, setForm] = useState(FORM_INICIAL);
  const [alerta, setAlerta] = useState(null);

  function mostrarAlerta(tipo, texto) {
    setAlerta({ tipo, texto });
    setTimeout(() => setAlerta(null), 3000);
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleCEPBlur() {
    const cep = form.cep.replace(/\D/g, "");
    if (cep.length !== 8) {
      if (cep.length > 0)
        mostrarAlerta("warning", "Formato de CEP inválido. Digite 8 números.");
      return;
    }
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) {
        mostrarAlerta("warning", "CEP não encontrado.");
      } else {
        setForm((prev) => ({
          ...prev,
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      }
    } catch {
      mostrarAlerta("danger", "Erro ao buscar o CEP.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const sucesso = await enviarFormularioContato({
      nome: form.nome,
      email: form.email,
      mensagem: form.mensagem,
    });
    mostrarAlerta(
      sucesso ? "success" : "danger",
      sucesso ? "Mensagem enviada com sucesso!" : "Erro ao enviar mensagem.",
    );
    if (sucesso) setForm(FORM_INICIAL);
  }

  return (
    <div className="container mt-5">
      {alerta && (
        <div className={`alert alert-${alerta.tipo}`}>{alerta.texto}</div>
      )}
      <h2>Contato</h2>
      <p>Entre em contato conosco através do formulário abaixo:</p>
      <form onSubmit={handleSubmit}>
        {CAMPOS.map((campo) => (
          <div key={campo.id} className="mb-3">
            <label htmlFor={campo.id} className="form-label">
              {campo.label}
            </label>
            <input
              type={campo.type}
              className="form-control"
              id={campo.id}
              placeholder={campo.placeholder}
              value={form[campo.id]}
              onChange={handleChange}
              onBlur={campo.isCep ? handleCEPBlur : undefined}
              required
            />
          </div>
        ))}
        <div className="mb-3">
          <label htmlFor="mensagem" className="form-label">
            Mensagem
          </label>
          <textarea
            className="form-control"
            id="mensagem"
            rows="4"
            placeholder="Digite sua mensagem"
            value={form.mensagem}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}
