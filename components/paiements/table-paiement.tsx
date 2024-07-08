
import { useState, MouseEvent } from "react";
import React from "react";
import { GridCellParams, /*GridPageChangeParams,*/ GridRowId } from '@mui/x-data-grid';
import MenuAction from "@/components/core/menu-action"
import type { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import axios from "axios";
// import { useRouter } from "next/router";
import { useRouter } from 'next/navigation'
import Swal from "sweetalert2";
import { Pagination } from "@mui/material";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  frFR,
} from "@mui/x-data-grid";
type Props = {
  data: any;
  selectedRows:any; setSelectedRows:any
};
const TablePaiement: React.FC<Props> = ({ data, selectedRows, setSelectedRows }) => {

  // console.log(selectedRows)
  const handleCellClick = (param: any, event: MouseEvent) => {
    event.stopPropagation();
  };

  const getRowId = (row: any): GridRowId => {
    return row.id_participant;
  };
  // const getSelectedRows = () => {
  //   const ids = [];
  //   selectedRows?.forEach((r:any)=>{
  //     ids.push(r.id_participant)
  //   })
  //    Swal.fire({
  //     title: 'Etes-vous sûr?',
  //     text: "Marquer payer?",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#2563eb',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Marquer payer',
  //     cancelButtonText: 'Annuler'
  //   }).then((result) => {
  //     if (result.isConfirmed) {

  //       // Swal.fire(
  //       //   'Deleted!',
  //       //   'Your file has been deleted.',
  //       //   'success'
  //       // )
  //       axios.post(`${process.env.base_route_get}/participants/payments-multiple`, { ids }).then(response => {
  //         if (response.status === 200) {

  //           setAnchorEl(null);
  //           router.push('/paiement-repas')
  //         }
  //       }).catch((err: any) => {
  //         console.log(err)
  //       })
  //     }
  //   })
  //    // Logique pour manipuler les lignes sélectionnées
  // };
  const handleRowClick = (param: any, event: MouseEvent) => {
    event.stopPropagation();
  };
  //    const handlePageSizeChange = (params: GridPageChangeParams) => {
  //     setPageSize(params.pageSize);
  //   };
  const [pageSize, setPageSize] = React.useState<number>(10);
  const actionSetting = {
    sortable: false,
    filterable: false,
    disableExport: true,
    hideable: false,
    flex: 1,
  };
  const columns: GridColDef[] = [
    {
      field: "email",
      headerName: "Email",
      // renderCell: (value) => <PersoToolTip value={value} />,
      // width:100,
      flex: 1,
    },
    {
      field: "prenom",
      headerName: "Prénom",
      // renderCell: (value) => <PersoToolTip value={value} />,
      // width:100,
      flex: 1,
    },
    {
      field: "nom",
      headerName: "Nom",
      // renderCell: (value) => <PersoToolTip value={value} />,
      // width:100,
      flex: 1,
    },
    {
      field: "payeur",
      headerName: "Payeur",
      // renderCell: (value) => <PersoToolTip value={value} />,
      // width:100,
      flex: 1,
    },
    {
      field: "email_payeur",
      headerName: "Email Payeur",
      // renderCell: (value) => <PersoToolTip value={value} />,
      // width:100,
      flex: 1,
    },
    {
      field: "montant_participation",
      headerName: "montant dû",
      // renderCell: (value) => <PersoToolTip value={value} />,
      // width:100,
      flex: 1,
    },
    // {
    //   field: "montant_paye",
    //   headerName: "montant payé",
    //   // renderCell: (value) => <PersoToolTip value={value} />,
    //   // width:100,
    //   flex: 1,
    // },
    // {
    //   field: "libelle",
    //   headerName: "Devise",
    //   // renderCell: (value) => <PersoToolTip value={value} />,
    //   // width:100,
    //   // renderCell: value=>{
    //   //   console.log(value)
    //   //   return 'Dollar'
    //   // },
    //   flex: 1,
    // },
    {
      field: "statut_payment",
      headerName: "Statut",
      // renderCell: (value) => <PersoToolTip value={value} />,
      // width:100,
      renderCell: value => {
        // console.log(value.row)
        return value.row.statut_payment ? <span className="p-1 bg-green-600 text-white rounded-lg">Payé</span> : <span className="p-1 bg-red-600 text-white rounded-lg">Non-payé</span>
      },
      flex: 1,
    },





    {
      field: "Actions",
      ...actionSetting,
      renderCell: (cellValues: GridCellParams) => (
        // <div className="grid grid-cols-2 gap-1 border-l-2 pl-2 -ml-2">
        //   {result?.create === 1 && (
        //     <EditBtn callBack={handleClick} cellValues={cellValues} />
        //   )}
        //   {result?.delete === 1 && (
        //     <DeleteBtn callBack={handleClickDelete} cellValues={cellValues} />
        //   )}
        // </div>
        <MenuAction
          path_details={`/paiement-repas/show/${cellValues.id}`}
          path_edit={`/paiement-repas/edit/${cellValues.id}`}
          id={`${cellValues.id}`}
          is_payment={true}
          statut_payment={cellValues.row.statut_payment}
        />
      ),
    },
  ];

  //   console.log(data)
  return (
    <>
      {/* <Button onClick={getSelectedRows} variant="contained" color="primary">
        Get Selected Rows
      </Button> */}
    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={getRowId}
        paginationMode="client"
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}
        // pagination
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            textOverflow: "clip",
            whiteSpace: "break-spaces",
            lineHeight: 1,
          },
        }}
        checkboxSelection={true}
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows_ = data.filter((row:any) =>
            selectedIDs.has(row.id_participant),
          );
          const result = selectedRows_.filter((row:any)=>!row.statut_payment)
          setSelectedRows(result);
        }}
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        onCellClick={handleCellClick}
        onRowClick={handleRowClick}

        components={{
          Toolbar: () => {
            return (
              <GridToolbarContainer
                sx={{ justifyContent: "flex-end" }}
                className="mui-button"
              >
                <GridToolbarColumnsButton />
                <GridToolbarExport />
                <GridToolbarFilterButton />
              </GridToolbarContainer>
            );
          },
        }}
      />
    </div></>
  );
};

export default TablePaiement;
