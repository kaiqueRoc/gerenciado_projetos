import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjetosLista from './pages/ProjetosLista';
import ProjetoDetalhes from './pages/ProjetoDetalhes';
import ProjetoFormPage from './pages/ProjetoFormPage';
import NovaTarefaPage from "./pages/NovaTarefaPage";
import ProjetoForm from "./components/ProjetoForm";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<ProjetosLista />} />
          <Route path="/projetos/novo" element={<ProjetoFormPage />} />
          <Route path="/projetos/:id" element={<ProjetoDetalhes />} />
          <Route path="/projetos/:id/editar" element={<ProjetoFormPage />} />
          <Route path="/projetos/:id/tarefas/nova" element={<NovaTarefaPage />} />
        </Routes>
      </Router>
  );
}

export default App;