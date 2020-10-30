import React from "react";

import "./styles.css";

import api from './services/api'
import { useEffect } from "react";
import { useState } from "react";

function App() {

  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {

    const newRepository = {
      title: `Novo Repositório ${Date.now()}`,
      url: `github.com/novo-repo-${Date.now()}`,
      techs: 'ReactJS'
    }

    const repository = await api.post('repositories', newRepository);

    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repo => repo.id !== id))
  }

  useEffect(() => {
    api.get('repositories').then(resp => {
      setRepositories(resp.data);
    });
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository =>
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
