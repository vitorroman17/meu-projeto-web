import { useEffect, useState } from "react";
import { carregarDepoimentos } from "../api.js";

export default function Home() {
  const [depoimentos, setDepoimentos] = useState([]);

  useEffect(() => {
    carregarDepoimentos().then(setDepoimentos);
  }, []);

  return (
    <div className="container mt-5">
      <h2>O que nossos clientes dizem</h2>
      <div className="row">
        {depoimentos.map((item) => (
          <div key={item.id} className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5>{item.name.split(" ")[0]}</h5>
                <p>{item.body.slice(0, 80)}...</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
