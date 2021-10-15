// import * as MemberService from '../../services/MemberService';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useAuth0 } from "@auth0/auth0-react";
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import EditUserByAdmin from "../components/Dialogs/EditUserByAdmin";
import * as serviceUser from "../services/User.service";
import DeleteUserByAdmin from "../components/Dialogs/DeleteUserByAdmin"



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { Id: 'nickname', numeric: false, disablePadding: false, label: 'Nickname' },
    { Id: 'fullname', numeric: false, disablePadding: false, label: 'FullName' },
    { Id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { Id: 'province', numeric: false, disablePadding: false, label: 'Province' },
    { Id: 'role', numeric: true, disablePadding: false, label: 'Role' },
    { Id: 'sexe', numeric: true, disablePadding: false, label: 'Sexe' },
    { Id: 'btn', numeric: false, disablePadding: false, label: 'Edit' },
    { Id: 'btn', numeric: false, disablePadding: false, label: 'Delete' }
];
function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.Id}
                        align='left'
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.Id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.Id}
                            direction={orderBy === headCell.Id ? order : 'asc'}
                            onClick={createSortHandler(headCell.Id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.Id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));
const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, allSelected, onClickDelete } = props;
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
        </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        Gestion des utilisateurs
        </Typography>
                )}

        </Toolbar>
    );
};
EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));
export default () => {
    const classes = useStyles();
    //   const { user, isAuthenticated } = useAuth0();
    //   const [isAllSelected, setIsAllSelected]=useState(false);
    //   const [rows, setRows] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [refresh, setRefresh] = useState(false);

    const [allUsers, setAllUsers] = useState([]);


    useEffect(() => {
        (async () => { setAllUsers(await serviceUser.getUsersWithRoleUser()); })();

    }, [refresh])




    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    const turnNumberInSexe = (sexe) => {
        switch (sexe) {

            case 0:
                return (<div className="">Feminin</div>);
            case 1:
                return (<div className="">Masculin</div>);
            case 2:
                return (<div className="">Autre</div>);
            default:
                return (<div>default</div>);
        }

    }
    const turnNumberInRole = (role) => {
        switch (role) {

            case 0:
                return (<div className="">User</div>);
            case 1:
                return (<div className="">Admin</div>);

            default:
                return (<div>default</div>);
        }

    }


    const turnNumberInProvnce = (province) => {
        switch (province) {

            case 0:
                return (<div className="">Bruxelles</div>);
            case 1:
                return (<div className="">Hainaut</div>);
            case 2:
                return (<div className="">Namur</div>);
            case 3:
                return (<div className="">Brabant_flamant</div>);
            case 4:
                return (<div className="">Brabant_wallon</div>);
            case 5:
                return (<div className="">Limbourg</div>);
            case 6:
                return (<div className="">Luxembourg</div>);
            case 7:
                return (<div className="">Anvers</div>);
            case 8:
                return (<div className="">Flandre_orientale</div>);
            case 9:
                return (<div className="">Flandre_occidentale</div>);

            default:
                return (<div>default</div>);
        }

    }



    const checkboxRole = (role) => {
        return role == 1;
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, allUsers.length - page * rowsPerPage);
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} allSelected={selected} />
                {/* onClickDelete={handleClickDelete} */}
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            //   onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={allUsers.length}
                        />
                        <TableBody>
                            {stableSort(allUsers, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.Id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow

                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >



                                            <TableCell align="left">{row.nickname}</TableCell>
                                            <TableCell align="left">{row.fullname}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{turnNumberInProvnce(row.province)}</TableCell>
                                            <TableCell align="left">{turnNumberInRole(row.role)}</TableCell>
                                            <TableCell align="left">{turnNumberInSexe(row.sexe)}</TableCell>
                                            <TableCell align="left"><EditUserByAdmin user={row} refreshPageAdmin={() => { setRefresh(!refresh) }} /></TableCell>
                                            <TableCell align="left"><DeleteUserByAdmin user={row} refreshPageAdmin={() => { setRefresh(!refresh) }} /></TableCell>
                                            <TableCell align="left">
                                                {/* <EditUserAdmin user={row} refresh={refreshPageAdmin} /> */}
                                            </TableCell>
                                            <TableCell align="left">
                                                {/* {<EditUserRoleAdmin user={row} refresh={refreshPageAdmin} />} */}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={allUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
    );
}