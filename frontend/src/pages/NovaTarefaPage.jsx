import React from 'react';
import TarefaForm from '../components/TarefaForm';
import { useParams } from 'react-router-dom';

function NovaTarefaPage() {
    const { id: projetoId } = useParams();

    return <TarefaForm projetoId={projetoId} />;
}

export default NovaTarefaPage;
