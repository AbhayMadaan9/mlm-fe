import { DataGrid, type GridColDef, type GridPaginationModel } from '@mui/x-data-grid';
import React from 'react'
import { useUsersQuery } from '../../services/api';
import { tableFormat } from '../../utils/dateTIme';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const navigate = useNavigate()
  const [pagination, setPagination] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const skip = pagination.page * pagination.pageSize;
  const limit = pagination.pageSize;
  const { data: users, isLoading: usersLoading } = useUsersQuery({ skip, limit })

  const columns: GridColDef[] = [
    { field: "_id", headerName: "#", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 150
    },
    {
      field: "email",
      headerName: "Email",
      width: 100
    },

    {
      field: "badgeType",
      headerName: "Badge",
      width: 150
    },

    {
      field: "createdAt",
      headerName: "Date",
      width: 180,
      valueFormatter: ({ value }) => {
        return tableFormat(value)
      }
    },
  ];
  return (
    <DataGrid
      rows={users?.data ?? []}
      getRowId={(row) => row._id}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
      pageSizeOptions={[5]}
      onPaginationModelChange={setPagination}
      disableRowSelectionOnClick
      onRowClick={(params) => navigate(`/users/${params.row._id}`)}
      loading={usersLoading}
        sx={{
        '& .MuiDataGrid-row:hover': {
          cursor: 'pointer',
          backgroundColor: '#f5f5f5',
        },
      }}
    />
  )
}
