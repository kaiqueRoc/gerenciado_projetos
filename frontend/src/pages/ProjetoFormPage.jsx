import React from 'react';
import ProjetoForm from '../components/ProjetoForm';
import { useParams } from 'react-router-dom';

function NovaTarefaPage() {
    const { id: projetoId } = useParams();

    return <ProjetoForm projetoId={projetoId} />;
}

export default NovaTarefaPage;
