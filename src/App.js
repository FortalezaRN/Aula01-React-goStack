import React, { useEffect, useState } from 'react';

import api from './services/api';
import Header from './components/Header';

import './App.css'

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      console.log(response)
      setProjects(response.data)
    })
  }, [])

  async function handleAddProject() {
    const response = await api.post('/projects',{
      title: `Projeto via front ${Date.now()}`,
      owner: "Leandro Fortaleza"
    })
    const project = response.data;
    setProjects([...projects, project])
  }

  return (
    <>
      <Header />
      <ul>
        {projects.map(proj => <li key={proj.id}>{proj.title}</li>)}
      </ul>
      <button onClick={handleAddProject}>Add projeto</button>
    </>
  )
}

export default App;