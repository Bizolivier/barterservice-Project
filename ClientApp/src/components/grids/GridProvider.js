import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PayementServiceDialog from "../Dialogs/PayementServiceDialog";
import * as frameworks from "../../Framework";
import * as prestationServ from "../../services/PrestationService";
import UpdatePrestation from "../Dialogs/UpdatePrestation";

export default ({ mesPresAPrester,refreshComponent,nomCo }) => {



    const handleState = (prestation) => {

        const newPrestation = {
            IdServiceProvided: prestation.idServiceProvided,
            IdUserClient: prestation.idUserClient,
            IdUserProvider: prestation.idUserProvider,
            Date: prestation.date,
            Etat: prestation.etat
        }
        prestationServ.getEtatChanged(prestation.id, prestation);
        refreshComponent();

    }
    const handleDelete=(id) => {
        prestationServ.getPrestDeleted(id);
        refreshComponent();

    }
    const switchEtat = (etat,prestation) => {
        switch (etat) {

            case 0:
                return (
                        <Button variant="outlined" color="secondary" onClick={() => { handleState(prestation) }}>
                            A Prester
                        </Button>
                        );
            case 1:
                return (<div className=" fw-bold">Attente de payement</div>);
            case 2:
                return (<div className="text-success fw-bold">clos</div>);
            default:
                return (<div>default</div>);

        }
    }

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "nomService",
            headerName: "Nom du Service",
            width: 200,
            editable: true
        },
        {
            field: "date",
            headerName: "Date ",
            type: "date",
            width: 250,
            renderCell: params => {
                return <div>{frameworks.formatDateTime(params.value)
                }<div>{console.log(params)}</div>
                </div>;
            }
        },
        {
            field: "nomClient",
            headerName: "Client",
            type: "number",
            width: 200,
            editable: true
        },
        {
            field: "etat",
            headerName: "Action",
            width: 150,
            renderCell: params => {
                return (    
                        <>
                        {switchEtat(params.value,params.row)}
                        </>              

                )
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

                            
                                <div>
                                {params.row.etat==0?
                                <Button variant="outlined" color="primary" >
                                      <UpdatePrestation prestToUpdate={params.row} refreshComponent={refreshComponent} nom={nomCo}/>
                                </Button>:<div></div>
                            }

                                </div>
                               
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
                        marginTop: 20
                    }}
                >
                    <DataGrid
                        rows={mesPresAPrester}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>



        </div>
    );
};