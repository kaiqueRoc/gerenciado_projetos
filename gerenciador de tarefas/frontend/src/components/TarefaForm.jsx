import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import api from '../services/api';
import {
    TextField,
    Button,
    Container,
    Typography,
    FormControlLabel,
    Checkbox,
    IconButton,
    FormControl, RadioGroup, Radio
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

function TarefaForm({setLoadPage,tarefaData, setLoading, onProjetoCriado, onClose}) {
    const {id} = useParams();
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataConclusao, setDataConclusao] = useState('');
    const [status, setStatus] = useState(false);
    const [tituloError, setTituloError] = useState(false);
    const [descricaoError, setDescricaoError] = useState(false);
    const [dataConclusaoError, setDataConclusaoError] = useState(false);
    const [tarefaId, setTarefaId] = useState(null);
    const [projeto, setProjeto] = useState(null);

    useEffect(() => {

        if(tarefaData){
            setTarefaId(tarefaData.id)
            setTitulo(tarefaData.titulo);
            setDescricao(tarefaData.descricao);
            setDataConclusao(tarefaData.dataConclusao);
            setStatus(tarefaData.concluida);
        }
    }, [tarefaData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!titulo || !descricao || !dataConclusao ) {
            setTituloError(!titulo);
            setDescricaoError(!descricao);
            setDataConclusaoError(!dataConclusao);
            return;
        }
        const tarefaData = {
            titulo,
            descricao,
            dataConclusao,
            concluida: status,
            projetoId : id,

        };

        try {

            if (tarefaId) {
                setLoading(true)
                await api.put(`/tarefas/${tarefaId}`, tarefaData);

            } else {
                await api.post(`/tarefas/salvar`, tarefaData);

            }
            onProjetoCriado(tarefaId ? true : null)
        } catch (error) {
            console.error('Erro ao salvar tarefa:', error);

        }finally {
            setLoading(false)
            onClose()
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
                <CloseIcon/>
            </IconButton>
            <Typography variant="h5" gutterBottom>
                {tarefaId ? 'Editar Tarefa' : 'Nova Tarefa'}
            </Typography>
            <form onSubmit={handleSubmit}>

                <TextField
                    label="Título"
                    fullWidth
                    value={titulo}
                    onChange={(e) => { setTitulo(e.target.value);
                        setTituloError(false);
                    }}
                    InputLabelProps={{shrink: true}}
                    margin="normal"
                    error={tituloError}
                    helperText={tituloError ? 'Este campo é obrigatório' : ''}
                />
                <TextField
                    label="Descrição"
                    fullWidth
                    multiline
                    rows={4}
                    value={descricao}
                    onChange={(e) => {setDescricao(e.target.value);
                        setDescricaoError(false)
                    }}
                    InputLabelProps={{shrink: true}}
                    margin="normal"
                    error={descricaoError}
                    helperText={descricaoError ? 'Este campo é obrigatório' : ''}
                />
                <TextField
                    label="Data de Conclusão"
                    type="date"
                    fullWidth
                    value={dataConclusao}
                    onChange={(e) => {setDataConclusao(e.target.value);
                        setDataConclusaoError(false);
                    }}
                    InputLabelProps={{shrink: true}}
                    margin="normal"
                    error={dataConclusaoError}
                    helperText={dataConclusaoError ? 'Este campo é obrigatório' : ''}
                />
                <FormControl component="fieldset" margin="normal" style={{display: 'flex', alignItems: 'center'}}>
                    <RadioGroup
                        row
                        aria-label="concluida"
                        name="concluida"
                        value={status}
                        onChange={(e)  => setStatus(e.target.value)
                        }

                    >
                        <FormControlLabel
                            value="false"
                            control={<Radio/>}
                            label="Pendente"
                        />
                        <FormControlLabel
                            value="true"
                            control={<Radio/>}
                            label="Concluída"
                        />
                    </RadioGroup>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" sx={{float: 'right', mt: 5}}>
                    Salvar
                </Button>
            </form>
        </Container>
    );
}

export default TarefaForm;
