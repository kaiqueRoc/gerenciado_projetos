import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import api from '../services/api';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Box,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Button,
    IconButton,
    Grid,
    Paper,
    TextField,
    Dialog,
    DialogContent,
    Alert,
    TableSortLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {format, parseISO} from "date-fns";
import TarefaForm from "../components/TarefaForm";
import Swal from "sweetalert2";

function ProjetoDetalhes() {
    const {id} = useParams();
    const [projeto, setProjeto] = useState(null);
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [loadPage, setLoadPage] = useState(null);
    const [tarefaData, setTarefaData] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [filter, setFilter] = useState('');
    const [orderBy, setOrderBy] = useState('nome');
    const [order, setOrder] = useState('asc');

    const handleOpen = (data) => {
        setTarefaData(data);
        setOpen(true);
    }
    const filteredTarefas = tarefas.filter(tarefa =>
        tarefa.titulo.toLowerCase().includes(filter.toLowerCase()) ||
        tarefa.descricao.toLowerCase().includes(filter.toLowerCase()) ||
        (tarefa.dataConclusao && format(parseISO(tarefa.dataConclusao), 'dd/MM/yyyy').includes(filter.toLowerCase()))
    );
    const handleSortRequest = (property) => {
        const isAscending = orderBy === property && order === 'asc';
        setOrder(isAscending ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchProjetoAndTarefas();
    }, [id]);

    const fetchProjetoAndTarefas = async () => {
        try {
            setLoading(true);
            const [projetoResponse, tarefasResponse] = await Promise.all([
                api.get(`/projetos/${id}`),
                api.get(`/tarefas/${id}`),
            ]);
            setProjeto(projetoResponse.data);
            setTarefas(tarefasResponse.data);
        } catch (error) {
            console.error('Erro ao buscar projeto e tarefas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTarefa = async (tarefaId) => {
        try {
            Swal.fire({
                title: 'Tem certeza?',
                text: 'Esta ação não pode ser revertida!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await api.delete(`tarefas/${tarefaId}`);
                        Swal.fire(
                            'Excluído!',
                            'A tarefa foi excluída com sucesso.',
                            'success'
                        );
                    } catch (error) {
                        console.error('Erro ao excluir tarefa:', error);
                        Swal.fire(
                            'Erro!',
                            'Ocorreu um erro ao excluir a tarefa.',
                            'error'
                        );
                    } finally {
                        setTarefas(tarefas.filter(t => t.id !== tarefaId));
                    }
                }
            });
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
        }
    };

    const handleTarefaCriada = (tarefaId) => {
        fetchProjetoAndTarefas();
        setAlertSeverity('success');
        setAlertMessage(tarefaId ? 'Tarefa atualizada com sucesso!' : 'Tarefa criada com sucesso!');
        setAlertOpen(true);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };



    const sortedTarefas = filteredTarefas.sort((a, b) => {
        if (order === 'asc') {
            return a[orderBy] > b[orderBy] ? 1 : -1;
        } else {
            return a[orderBy] < b[orderBy] ? 1 : -1;
        }
    });

    if (loading) {
        return <CircularProgress />;
    }

    if (!projeto) {
        return <Typography>Projeto não encontrado.</Typography>;
    }

    return (
        <Container maxWidth="md">
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Detalhes do Projeto
                    </Typography>
                    <Typography variant="h6" component="div">
                        <strong>Nome do Projeto:</strong> {projeto.nome}
                    </Typography>
                    <Typography variant="body1" component="div">
                        <strong>Descrição:</strong> {projeto.descricao}
                    </Typography>
                    <Typography variant="body1" component="div">
                        <strong>Data de Início:</strong> {format(parseISO(projeto.dataInicio), 'dd/MM/yyyy')}
                    </Typography>
                </CardContent>
            </Card>

            <Box mt={3}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9}>
                        <TextField
                            label="Buscar Tarefas"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={handleFilterChange}
                            value={filter}
                        />
                    </Grid>
                    <Grid item xs={3} style={{display: 'flex', alignItems: 'center', marginTop: 8}}>
                        <Button
                            component={Link}
                            onClick={() => handleOpen(null)}
                            variant="contained"
                            color="secondary"
                            fullWidth
                            style={{height: '56px'}}
                        >
                            Nova Tarefa
                            <AddIcon />
                        </Button>
                    </Grid>
                </Grid>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'titulo'}
                                        direction={orderBy === 'titulo' ? order : 'asc'}
                                        onClick={() => handleSortRequest('titulo')}
                                    >
                                        Título
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'descricao'}
                                        direction={orderBy === 'descricao' ? order : 'asc'}
                                        onClick={() => handleSortRequest('descricao')}
                                    >
                                        Descrição
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'dataConclusao'}
                                        direction={orderBy === 'dataConclusao' ? order : 'asc'}
                                        onClick={() => handleSortRequest('dataConclusao')}
                                    >
                                        Data de Conclusão
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Status da tarefa</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        {sortedTarefas.length > 0 ? (
                            <TableBody>
                                {sortedTarefas
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(tarefa => (
                                        <TableRow key={tarefa.id}>
                                            <TableCell>{tarefa.titulo}</TableCell>
                                            <TableCell>{tarefa.descricao}</TableCell>
                                            <TableCell>{format(parseISO(tarefa.dataConclusao), 'dd/MM/yyyy')}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    style={{
                                                        backgroundColor: tarefa.concluida ? '#8BC34A' : 'rgb(251,204,15)',
                                                        color: 'white',
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    {tarefa.concluida ? 'Concluída' : 'Pendente'}
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleOpen(tarefa)}
                                                    aria-label="editar"
                                                    size="small"
                                                    variant="contained"
                                                    color="primary"
                                                    style={{marginRight: '8px'}}
                                                >
                                                    <EditIcon />
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="error"
                                                    title={'Excluir'}
                                                    onClick={() => handleDeleteTarefa(tarefa.id)}
                                                    aria-label="excluir"
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px" minWidth="100px">
                                            <Typography variant="body1">Nenhuma tarefa encontrada.</Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={sortedTarefas.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Box>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogContent>
                    <TarefaForm
                        setLoadPage={setLoadPage}
                        onProjetoCriado={handleTarefaCriada}
                        onClose={handleClose}
                        setLoading={setLoading}
                        tarefaData={tarefaData}
                    />
                </DialogContent>
            </Dialog>
            <Box mt={2} mx="auto" style={{ maxWidth: 600 }}>
                {alertOpen && (
                    <Alert severity={alertSeverity} variant="outlined" onClose={handleAlertClose}>
                        {alertMessage}
                    </Alert>
                )}
            </Box>
        </Container>
    );
}

export default ProjetoDetalhes;
