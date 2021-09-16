import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as prestationServ from "../services/PrestationService";
import * as userService from "../services/User.service";
import { useAuth0 } from "@auth0/auth0-react";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: params =>
      `${params.getValue(params.id, "firstName") || ""} ${params.getValue(
        params.id,
        "lastName"
      ) || ""}`
  }
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
];

export default () => {
  const [myPrest, setMyPrest] = useState([]);
  const [userCoId, setUserCoId] = useState(0);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated) {
        const userConnected = await userService.GetOneByEmail(user.email);

        console.log(userConnected);
        const prestCommande = await prestationServ.getOrdered(
          userConnected.userId
        );
        setMyPrest(prestCommande);
      }
    }
    fetchData();
  }, [user]);

  return (
    <div className="mx-5">
      <div className=" mx-5 text-dark text-center ">
        <h4>Mon gestionnaire de prestations</h4>
      </div>
      <div className="fst-italic mx-5 text-dark ">
        <h5> Mes prestations en que Client</h5>
      </div>

      <div style={{ height: 400, width: "100%", marginTop: 20 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};
