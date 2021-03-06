import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PayementServiceDialog from "../Dialogs/PayementServiceDialog";
import * as frameworks from "../../Framework";
import * as prestationServ from "../../services/PrestationService";
import UpdatePrestation from "../Dialogs/UpdatePrestation";







export default ({ mesPresCommander, refreshComponent, nomCo }) => {

    const handleState = (id, prest) => {
        prestationServ.getEtatChanged(id, prest);
        refreshComponent();

    }
    const handleDelete = (id) => {
        prestationServ.getPrestDeleted(id);
        refreshComponent();

    }

    const switchEtat = (etat, prest) => {
        switch (etat) {

            case 0:
                return (<div className="fw-bold">Attente de prestation</div>);
            case 1:
                return (
                    <div>
                        <PayementServiceDialog prestation={prest} payer={() => { handleState(prest.id, prest) }} />
                    </div>);
            case 2:
                return (<div className="text-success fw-bold ">Clos</div>);
            default:
                return (<div>default</div>);

        }
    }

    const columns = [
        { field: "id", headerName: "ID", width: 100, editable: false },
        {
            field: "nomService",
            headerName: "Service",
            width: 150,
            editable: true
        },
        {
            field: "date",
            headerName: "Date ",
            type: "date",
            width: 250,
            renderCell: params => {
                return <div>{frameworks.formatDateTime(params.value)
                }<div>{console.log(params.row)}</div>
                </div>;
            }
        },
        {
            field: "nomProvider",
            headerName: "Prestataire",
            type: "number",
            width: 130,
            editable: true
        },
        {
            field: "etat",
            headerName: "Action",
            width: 200,
            renderCell: params => {
                return (<>{switchEtat(params.value, params.row)}</>)
            }
        },
        {
            field: "y",
            headerName: "Editer",

            width: 150,
            renderCell: params => {
                return (
                    (
                        <div>
                            {params.row.etat == 0 ?

                                <UpdatePrestation prestToUpdate={params.row} refreshComponent={refreshComponent} nom={nomCo} />
                                : <div></div>
                            }

                        </div>
                    )

                )
            }
        },
        {
            field: "x",
            headerName: "Effacer",

            width: 150,
            renderCell: params => {
                return (
                    (

                        <div>

                            (
                                <div>
                                <Button variant="outlined" color="primary" onClick={() => { handleDelete(params.row.id) }}>
                                    Delete
                                    </Button>


                            </div>)

                        </div>
                    )

                )
            }
        }
    ];





    return (
        <div className="mx-5">
            <div>
                <div
                    style={{
                        height: 400,
                        width: "100%",
                        marginTop: 20,
                        "background-color": "white"
                    }}
                >
                    <DataGrid
                        rows={mesPresCommander}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection={false}
                        disableSelectionOnClick

                    />
                </div>
            </div>



        </div>
    );
};



