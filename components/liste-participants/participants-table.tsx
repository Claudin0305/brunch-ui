
import { useState, MouseEvent, useEffect } from "react";
import React from "react";
import { GridCellParams, /*GridPageChangeParams,*/ GridRowId } from '@mui/x-data-grid';
import MenuAction from "@/components/core/menu-action"
import type { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Button from "@mui/material/Button";

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
    data: any | [];
};
const TableParticipant: React.FC<Props> = ({ data }) => {
    const [orderBy, setOrderBy] = useState<"date" | "name" |null>(null)
    const [orderData, setOrderData] = useState<any>([]);
    const handleCellClick = (param: any, event: MouseEvent) => {
        event.stopPropagation();
    };

    const getRowId = (row: any): GridRowId => {
        return row.id_participant;
    };
    const handleClickOrderBy = (orderBy: "date" | "name") => {
        setOrderBy(orderBy);
    }
useEffect(()=>{
    setOrderData(data)
    // console.log(orderData)
},[])
    useEffect(() => {
        let d:[]|any = [...data]
        // console.log(d)
        if (orderBy === "date") {
            // console.log("by date")
            d?.sort((a: any, b: any) => {
                let fa = a.createdAt,
                    fb = b.createdAt;

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
            setOrderData(d)
        } else if(orderBy ==="name") {
            // console.log("name")
            // console.log(d)
            d?.sort((a: any, b: any) => {
                let fa = a.nom,
                    fb = b.nom;

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
            setOrderData(d)
        }
    }, [orderBy])

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
            field: "nom",
            headerName: "Nom",
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
            field: "pays",
            headerName: "Pays",
            // renderCell: (value) => <PersoToolTip value={value} />,
            // width:100,
            renderCell: value => value.row.nomPays
            ,
            flex: 1,
        },
        {
            field: "departement",
            headerName: "Département/Province/Etat/Canton",
            // renderCell: (value) => <PersoToolTip value={value} />,
            // width:100,
            renderCell: value => value.row.ville.libelleDepartement
            ,
            flex: 1,
        },
        {
            field: "ville",
            headerName: "Ville",
            // renderCell: (value) => <PersoToolTip value={value} />,
            // width:100,
            renderCell: value => value.row.ville.libelle
            ,
            flex: 1,
        }

        , {
            field: "nomAffiliation",
            headerName: "Affiliation",
            renderCell: (value) => value.row.statusAffiliation === true ? value.row.nomAffiliation : "",
            // renderCell: (value) => <PersoToolTip value={value} />,
            // width:100,
            flex: 1,
        },





        // {
        //     field: "Actions",
        //     ...actionSetting,
        //     renderCell: (cellValues: GridCellParams) => (
        //         // <div className="grid grid-cols-2 gap-1 border-l-2 pl-2 -ml-2">
        //         //   {result?.create === 1 && (
        //         //     <EditBtn callBack={handleClick} cellValues={cellValues} />
        //         //   )}
        //         //   {result?.delete === 1 && (
        //         //     <DeleteBtn callBack={handleClickDelete} cellValues={cellValues} />
        //         //   )}
        //         // </div>
        //         <MenuAction
        //             path_details={`/locaux-brunch/show/${cellValues.id}`}
        //             path_edit={`/locaux-brunch/edit/${cellValues.id}`}
        //         />
        //     ),
        // },
    ];

    //   console.log(data)
    return (
        <>
            <div className="flex justify-end w-full gap-8 md:flex-row flex-col mt-36 mb-8">
                <Button
                    onClick={() => {
                        handleClickOrderBy("name")
                    }}
                    className={`bg-blue-500 capitalize text-white flex items-center justify-center gap-x-2 hover:bg-blue-400`}
                    variant="contained"

                >
                    Affichage par ordre alphabétique
                </Button>
                <Button
                    onClick={() => {
                        handleClickOrderBy("date")
                    }}
                    className={`bg-blue-500 capitalize text-white flex items-center justify-center gap-x-2 hover:bg-blue-400`}
                    variant="contained"

                >
                    Affichage par ordre chronologique
                </Button>
            </div>
            <div style={{ height: "80%", width: "100%", overflow: "auto" }}>
                <DataGrid
                    rows={orderData}
                    // rows={data}
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

                    components={{
                        Toolbar: () => {
                            return (
                                <GridToolbarContainer
                                    sx={{ justifyContent: "flex-end" }}
                                    className="mui-button"
                                >
                                    {/* <GridToolbarColumnsButton /> */}
                                    {/* <GridToolbarExport /> */}
                                    <GridToolbarFilterButton />
                                </GridToolbarContainer>
                            );
                        },
                    }}
                />
            </div>
        </>
    );
};

export default TableParticipant;
