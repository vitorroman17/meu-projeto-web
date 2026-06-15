import { Link, useLocation } from "react-router-dom";

export default function Navbar({ temaLabel, alterarTema }) {
  const { pathname } = useLocation();

  return (
    <>
      <div className="container">
        <h1 className="text-center text-primary mt-5">Lançamento Oficial</h1>
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark border-bottom border-secondary-subtle">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Meu Projeto
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link${pathname === "/" ? " active" : ""}`}
                  to="/"
                >
                  Início
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link${pathname === "/produtos" ? " active" : ""}`}
                  to="/produtos"
                >
                  Produtos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link${pathname === "/contato" ? " active" : ""}`}
                  to="/contato"
                >
                  Contato
                </Link>
              </li>
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm"
                  onClick={alterarTema}
                >
                  {temaLabel}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
