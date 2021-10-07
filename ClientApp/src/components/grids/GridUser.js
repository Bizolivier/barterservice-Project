import React from 'react';
import { DataGrid } from "@mui/x-data-grid";

export default ({ allUsers }) => {

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "nickname",
            headerName: " Nickname",
            width: 200,
            editable: true
        },
        {
            field: "fullname",
            headerName: "fullname ",

            width: 250,
            editable: true
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
            editable: true
        },
        {
            field: "province",
            headerName: "Province",
            width: 200,
            editable: true
        },
        {
            field: "role",
            headerName: "Rôle",
            width: 100,
            editable: true
        },
        {
            field: "sexe",
            headerName: "Sexe",
            width: 100,
            editable: true
        },
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
                        rows={allUsers}
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



