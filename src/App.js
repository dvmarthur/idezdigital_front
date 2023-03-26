import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    municipios: [],
  };

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/municipios/MG/')
      .then(response => {
        console.log(response.data); // Debug do resultado da API
        this.setState({ municipios: response.data });
      })
      .catch(error => console.log(error)); // Debug do erro, se ocorrer
  }

  render() {
    return (
      <div>
        <h1>Municípios de MG</h1>
        <ul>
          {this.state.municipios.map(municipio => (
            <li key={municipio.ibge_code}>{municipio.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;