import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css'

import api from './service/api';

 function App() {

  const [input, setInput] = useState('')
  const [cep, setcep] = useState({})

  function onchangeCep(e) {
    let value = e.target.value
    value = value.replace(/\D/g, "")
    value = value.replace(/^(\d{5})(\d)/, "$1-$2")
    setInput(value)
  }

  async function handleSearch() {
    
    if(input === "") {
      alert('Preencha')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setcep(response.data)
      setInput("")

    } catch{
      alert('Erro ao Buscar este CEP')
      setInput("")
    }
  }
  

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input type="text"
          placeholder="Digite se Cep"
          value={input}
          maxLength="9"
          onChange={onchangeCep}
        />                      
        <button className="btnSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
          <span>Pesquisar</span>
        </button>
      </div>
    
      {Object.keys(cep).length > 0 && (
      <main className='main'>
        <h2>CEP: {cep.cep}</h2>
        <span>Endereço: {cep.logradouro}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Cidade: {cep.localidade}</span>
        <span>Estado: {cep.uf}</span>
      </main>
      )}
     
    </div>
  );
}

export default App;
