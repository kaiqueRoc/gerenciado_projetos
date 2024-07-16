import React, {useState, useEffect} from 'react';
import api from '../services/api';
import {
    Container,
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    Paper,
    Button, Grid, DialogTitle, Dialog, DialogActions, DialogContent, Box, TablePagination,
    Alert
} from '@mui/material';
import {Link} from 'react-router-dom';
import ProjetoForm from "../components/ProjetoForm";
import {format, parseISO} from 'date-fns';
import Swal from 'sweetalert2';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function ProjetosLista() {
    const [projetos, setProjetos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderBy, setOrderBy] = useState('nome');
    const [order, setOrder] = useState('asc');
    const [filter, setFilter] = useState('');
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [projetoId, setProjetoId] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loadPage, setLoadPage] = useState(null)
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    useEffect(() => {
        fetchProjetos();
    }, [loadPage]);

    const fetchProjetos = async () => {
        try {
            setLoading(true);
            const response = await api.get('/projetos');
            setProjetos(response.data);
        } catch (error) {
            console.error('Erro ao buscar projetos:', error);

        } finally {
            setLoading(false);
        }
    };

    const handleSortRequest = (property) => {
        const isAscending = orderBy === property && order === 'asc';
        setOrder(isAscending ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };
    const formatDate = (date) => {
        const d = new Date(date);
        let day = String(d.getDate()).padStart(2, '0');
        let month = String(d.getMonth() + 1).padStart(2, '0');
        let year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const filteredProjetos = projetos.filter(projeto =>
        projeto.nome.toLowerCase().includes(filter.toLowerCase()) ||
        projeto.descricao.toLowerCase().includes(filter.toLowerCase()) ||
        (projeto.dataInicio && format(parseISO(projeto.dataInicio), 'dd/MM/yyyy').includes(filter.toLowerCase()))
    );

    const handleOpen = (data = null) => {
        setProjetoId(data);
        setOpen(true);
    };

    const handleClose = () => {
        setProjetoId(null);
        setOpen(false);
    };

    const handleProjetoCriado = (projetoId) => {
        fetchProjetos(); // Atualiza a lista de projetos após criação
        handleClose();
        setAlertSeverity('success');
        setAlertMessage(projetoId ? 'Projeto atualizado com sucesso!' : 'Projeto criado com sucesso!');
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };
    const sortedProjetos = filteredProjetos.sort((a, b) => {
        if (order === 'asc') {
            return a[orderBy] > b[orderBy] ? 1 : -1;
        } else {
            return a[orderBy] < b[orderBy] ? 1 : -1;
        }
    });
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleDelete = async (id) => {
        // Exibir SweetAlert para confirmação antes de excluir
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
                    await api.delete(`/projetos/${id}`);

                    Swal.fire(
                        'Excluído!',
                        'O projeto foi excluído com sucesso.',
                        'success'
                    );
                } catch (error) {
                    console.error('Erro ao excluir projeto:', error);
                    Swal.fire(
                        'Erro!',
                        'Ocorreu um erro ao excluir o projeto.',
                        'error'
                    );
                } finally {
                    fetchProjetos()
                }
            }
        });
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Projetos
            </Typography>

            <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                    <TextField
                        label="Buscar"
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
                        onClick={() => handleOpen(projetoId)}
                        variant="contained"
                        color="secondary"
                        fullWidth
                        style={{height: '56px'}}
                    >
                        Novo Projeto
                        <AddIcon/>
                    </Button>
                </Grid>
            </Grid>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress/>
                </Box>
            ) : (
                <Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === 'nome'}
                                            direction={order}
                                            onClick={() => handleSortRequest('nome')}
                                        >
                                            Nome
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === 'descricao'}
                                            direction={order}
                                            onClick={() => handleSortRequest('descricao')}
                                        >
                                            Descrição
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === 'dataInicio'}
                                            direction={order}
                                            onClick={() => handleSortRequest('dataInicio')}
                                        >
                                            Data de Início
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>Ações</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            {sortedProjetos.length > 0 ? (
                                    <TableBody>
                                        {sortedProjetos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(projeto => (
                                            <TableRow key={projeto.id}>
                                                <TableCell>{projeto.nome}</TableCell>
                                                <TableCell>{projeto.descricao}</TableCell>
                                                <TableCell>{format(parseISO(projeto.dataInicio), 'dd/MM/yyyy')}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        component={Link}
                                                        to={`/projetos/${projeto.id}`}
                                                        size="small"
                                                        variant="contained"
                                                        color="primary"
                                                    >
                                                        Detalhes
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        component={Link}
                                                        onClick={() => handleOpen(projeto.id)}
                                                        size="small"
                                                        variant="contained"
                                                        title={'Editar'}
                                                        style={{marginRight: '8px'}}
                                                    >
                                                        <EditIcon/>
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDelete(projeto.id)}
                                                        size="small"
                                                        variant="contained"
                                                        color="error"
                                                        title={'Excluir'}

                                                    >
                                                        <DeleteIcon/>

                                                    </Button>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                            ) : (
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <Box display="flex" justifyContent="center" alignItems="center"
                                                 minHeight="100px" minWidth="100px">
                                                <Typography variant="body1">Nenhuma tarefa encontrada.</Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                                )}
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={sortedProjetos.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={{
                            border: '1px solid #e0e0e0',
                            borderBottomLeftRadius: '20px',
                            borderBottomRightRadius: '20px'
                        }}

                    />
                </Box>
            )}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogContent>
                    <ProjetoForm
                        setLoadPage={setLoadPage}
                        onProjetoCriado={handleProjetoCriado}
                        onClose={handleClose}
                        setLoading={setLoading}
                        projetoId={projetoId}
                    />
                </DialogContent>

            </Dialog>
            <Box mt={2} mx="auto" style={{maxWidth: 600}}>
                {alertOpen && (
                    <Alert severity={alertSeverity} variant="outlined" onClose={handleAlertClose}>
                        {alertMessage}
                    </Alert>
                )}
            </Box>
        </Container>
    );
}

export default ProjetosLista;
