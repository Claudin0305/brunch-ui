
import { useState, MouseEvent } from "react";
import React from "react";
import { GridCellParams, /*GridPageChangeParams,*/ GridRowId } from '@mui/x-data-grid';
import MenuAction from "@/components/core/menu-action"
import type { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

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
};
const TableMessage: React.FC<Props> = ({ data }) => {
   const handleCellClick = (param: any, event: MouseEvent) => {
    event.stopPropagation();
  };

//   const getRowId = (row:any):GridRowId => {
//   return row.id_ville;
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
      field: "message_type",
      headerName: "Type Message",
      renderCell: value => {
        if(value.row.messageType === 'INSCRIPTION' ){
          return "Inscription"
        }else if(value.row.messageType === 'DON' ){
return "Don"
        }else if(value.row.messageType === 'ANNULATION' ){
          return 'Annulation'
        }else{
          return "Paiement"
        }
         }
      ,
      flex:1,
    },
    {
      field:"subject",
      flex:1,
      headerName:"Objet du message"
    },
    // {
    //   field: "libelle_texte",
    //   headerName: "Contenu",
    //   // renderCell: (value) => <PersoToolTip value={value} />,
    //   // width:100,
    //   flex:1,
    // },






    {
      field: "Actions",
      ...actionSetting,
      renderCell: (cellValues:  GridCellParams) => (
        // <div className="grid grid-cols-2 gap-1 border-l-2 pl-2 -ml-2">
        //   {result?.create === 1 && (
        //     <EditBtn callBack={handleClick} cellValues={cellValues} />
        //   )}
        //   {result?.delete === 1 && (
        //     <DeleteBtn callBack={handleClickDelete} cellValues={cellValues} />
        //   )}
        // </div>
        <MenuAction
        path_details={`/messages/show/${cellValues.id}`}
        path_edit={`/messages/edit/${cellValues.id}`}
        />
      ),
    },
  ];

//   console.log(data)
  return (
    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
      <DataGrid
        rows={data}
        columns={columns}
        // getRowId={getRowId}
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
    </div>
  );
};

export default TableMessage;
