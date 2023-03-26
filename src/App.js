import { useState } from 'react';
import axios from 'axios';

function App() {
  const [municipios, setMunicipios] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  async function buscarMunicipios(uf) {
    try {
      const response = await axios.get(`http://localhost:8000/municipios/${uf}`);
      setMunicipios(response.data);
      setPaginaAtual(1); // resetar a página atual ao buscar uma nova lista de municípios
    } catch (error) {
      console.error(error);
    }
  }

  const municipiosPorPagina = 10;
  const indiceInicial = (paginaAtual - 1) * municipiosPorPagina;
  const indiceFinal = indiceInicial + municipiosPorPagina;
  const municipiosPaginados = municipios.slice(indiceInicial, indiceFinal);

  return (
    <div>
      <label htmlFor="select-estado">Selecione um estado:</label>
      <select id="select-estado" onChange={(e) => buscarMunicipios(e.target.value)}>
        <option value="">Selecione...</option>
        {estados.map((estado) => (
          <option key={estado} value={estado}>
            {estado}
          </option>
        ))}
      </select>

      <table className="table">
        <thead>
          <tr>
            <th>Nome da cidade</th>
            <th>Código IBGE</th>
          </tr>
        </thead>
        <tbody>
          {municipiosPaginados.map((municipio) => (
            <tr key={municipio.ibge_code}>
              <td>{municipio.name}</td>
              <td>{municipio.ibge_code}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav aria-label="Navegação de página exemplo">
        <ul className="pagination d-flex">
          {Array.from({ length: Math.ceil(municipios.length / 10) }, (_, i) => i + 1).map((page) => (
            <li className={`page-item mx-auto ${paginaAtual === page ? 'active' : ''}`} key={page}>
              <button className="page-link" onClick={() => setPaginaAtual(page)}>{page}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default App;
