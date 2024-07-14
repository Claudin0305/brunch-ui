
import { useState, MouseEvent } from "react";
import React from "react";
import { GridCellParams, /*GridPageChangeParams,*/ GridRowId } from '@mui/x-data-grid';
import MenuAction from "@/components/core/menu-action"
import type { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

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
    setSelectedRows: any
};
const TableParticipant: React.FC<Props> = ({ data, setSelectedRows }) => {
    const handleCellClick = (param: any, event: MouseEvent) => {
        event.stopPropagation();
    };

    const getRowId = (row: any): GridRowId => {
        return row.id_participant;
    };

    const handleRowClick = (param: any, event: MouseEvent) => {
        event.stopPropagation();
    };
    //  const handlePageSizeChange = (params: GridPageChangeParams) => {
    //   setPageSize(params.pageSize);
    // };
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
            field: "email",
            headerName: "Courriel",
            // renderCell: (value) => <PersoToolTip value={value} />,
            // width:100,
            flex: 1,
        },
        {
            field: "tel_participant",
            headerName: "Tel",
            // renderCell: (value) => <PersoToolTip value={value} />,
            // width:100,
            flex: 1,
        },
        {
            field: "nomAffiliation",
            headerName: "Affiliation",
            // renderCell: (value) => <PersoToolTip value={value} />,
            // width:100,
            flex: 1,
        },
        {
            field: "pays",
            headerName: "Pays",
            // renderCell: (value) => <PersoToolTip value={value} />,
            // width:100,
            renderCell: value => value.row.nomPays,
            valueGetter: value => value.row.nomPays,
            flex: 1,
        },
        {
            field: "departement",
            headerName: "Département",
            // renderCell: (value) => <PersoToolTip value={value} />,
            // width:100,
            renderCell: value => value.row.ville.libelleDepartement,
            valueGetter: value => value.row.ville.libelleDepartement,
            flex: 1,
        },
        {
            field: "ville",
            headerName: "Ville",
            // renderCell: (value) => <PersoToolTip value={value} />,
            // width:100,
            renderCell: value => value.row.ville.libelle,
            valueGetter: value => value.row.ville.libelle,
            flex: 1,
        },
        {
            field: "Local",
            headerName: "Local",
            // renderCell: (value) => <PersoToolTip value={value} />,
            // width:100,
            renderCell: value => value.row.libelleLocal

            ,
            valueGetter: value => value.row.libelleLocal,
            flex: 1,
        },
        {
            field: "mode_participation",
            headerName: "Mode Participation",
            // renderCell: (value) => <PersoToolTip value={value} />,
            // width:100,


            flex: 1,
        },

        {
            field: "abonnement_newsletter",
            headerName: "Newsletter",
            renderCell: (value) => value.row.abonnement_newsletter ? <DoneIcon /> : <ClearIcon />,
            // width:100,
            flex: 1,
        },
        {
            field: "authorisationListe",
            headerName: "Listing",
            renderCell: (value) => value.row.authorisationListe ? <DoneIcon /> : <ClearIcon />,
            // width:100,
            flex: 1,
        },





        {
            field: "Actions",
            ...actionSetting,
            renderCell: (cellValues: GridCellParams) => {
                // <div className="grid grid-cols-2 gap-1 border-l-2 pl-2 -ml-2">
                //   {result?.create === 1 && (
                //     <EditBtn callBack={handleClick} cellValues={cellValues} />
                //   )}
                //   {result?.delete === 1 && (
                //     <DeleteBtn callBack={handleClickDelete} cellValues={cellValues} />
                //   )}
                // </div>
                console.log(cellValues.row);
                return (<MenuAction
                    path_details={`/participants/show/${cellValues.id}`}
                    path_edit={`/inscriptions/edit/${cellValues.row.idEvent}/${cellValues.row.username}`}
                />)
            },
        },
    ];

    //   console.log(data)
    return (
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
                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                onCellClick={handleCellClick}
                onRowClick={handleRowClick}
                onRowSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRows_ = data.filter((row: any) =>
                        selectedIDs.has(row.id_participant),
                    );
                    const result = selectedRows_.filter((row: any) => !row.statut_participant)
                    setSelectedRows(result);
                }}
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

export default TableParticipant;
