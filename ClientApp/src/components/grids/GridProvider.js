import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PayementServiceDialog from "../Dialogs/PayementServiceDialog";
import * as frameworks from "../../Framework";

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
        width: 200,
        renderCell: params => {
            return <div>{frameworks.formatDate(params.value)
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

        flex: 1,
        renderCell: params => {
            return (
                (

                    <div>

                        {params.value == 0 ? (
                            <div>
                                <IconButton>
                                    <HourglassEmptyIcon />
                                    <p>Preter</p>
                                </IconButton>

                            </div>)
                            :
                            (<div>
                                <IconButton>
                                    <CheckCircleIcon />
                                    <p>En attente de payement</p>
                                </IconButton>
                            </div>)
                        }



                    </div>
                )

            )
        }
    }
];

export default ({ mesPresAPrester }) => {



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