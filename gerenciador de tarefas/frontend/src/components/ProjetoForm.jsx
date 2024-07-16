import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import {TextField, Button, Container, Typography, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
function ProjetoForm({ onProjetoCriado, onClose, setLoading, projetoId, setLoadPage }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [nomeError, setNomeError] = useState(false);
    const [descricaoError, setDescricaoError] = useState(false);
    const [dataInicioError, setDataInicioError] = useState(false);

    useEffect(() => {
        if (projetoId) {
            api.get(`/projetos/${projetoId}`)
                .then(response => {
                    setNome(response.data.nome);
                    setDescricao(response.data.descricao);
                    setDataInicio(response.data.dataInicio);
                })
                .catch(error => console.error('Erro ao buscar projeto:', error));
        }
    }, [projetoId]);



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!nome || !descricao || !dataInicio) {
            setNomeError(!nome);
            setDescricaoError(!descricao);
            setDataInicioError(!dataInicio);
            return;
        }
        const projetoData = {
            nome,
            descricao,
            dataInicio,
        };

        try {
            setLoading(true)
            if (projetoId) {
                await api.put(`/projetos/${projetoId}`, projetoData);
                onProjetoCriado(true);
            } else {
                const response = await api.post('/projetos', projetoData);
                if (onProjetoCriado) {
                    onProjetoCriado(null);
                }
            }

            onClose();
        } catch (error) {
            console.error('Erro ao salvar projeto:', error);

        }finally {
            setLoading(false)
            setLoadPage(true)
        }
    };

    return (
        <Container maxWidth="sm">
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <Typography variant="h5" gutterBottom>
                {projetoId ? 'Editar Projeto' : 'Novo Projeto'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nome"
                    fullWidth
                    value={nome}
                    onChange={(e) => {
                        setNome(e.target.value);
                        setNomeError(false);
                    }}
                    margin="normal"
                    error={nomeError}
                    helperText={nomeError ? 'Este campo é obrigatório' : ''}
                />
                <TextField
                    label="Descrição"
                    fullWidth
                    multiline
                    rows={4}
                    value={descricao}
                    onChange={(e) => {
                        setDescricao(e.target.value);
                        setDescricaoError(false);
                    }}
                    margin="normal"
                    error={descricaoError}
                    helperText={descricaoError ? 'Este campo é obrigatório' : ''}
                />
                <TextField
                    label="Data de Início"
                    type="date"
                    fullWidth
                    value={dataInicio}
                    onChange={(e) => {
                        setDataInicio(e.target.value);
                        setDataInicioError(false);
                    }}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    error={dataInicioError}
                    helperText={dataInicioError ? 'Este campo é obrigatório' : ''}
                />
                <Button type="submit" variant="contained" color="primary"  sx={{ float: 'right' }} >
                    Salvar
                </Button>
            </form>
        </Container>
    );
}

export default ProjetoForm;
