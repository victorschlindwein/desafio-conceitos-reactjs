import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";


function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepos(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `GoStaack 13 - ${Date.now()}`,
      url: "Vitão Schlindwein",
      techs: ["React", "Node"]
  });

  const repo = response.data;
  setRepos([...repos, repo])
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    const idCatcher = repos.findIndex( repo => repo.id === id);
    await api.delete(`repositories/${id}`);
    
    repos.splice(idCatcher, 1)
    setRepos([...repos]);
 

    console.log(idCatcher);
  }

  //const idToRemove = "05e762ac-1c6f-45dd-95c1-eb0635b14276"

  return (
    <div>
      <ul data-testid="repository-list">
            {repos.map(repo => 
            <li key={repo.id}>{repo.title} 
            
            <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
          
           </li>)}
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
