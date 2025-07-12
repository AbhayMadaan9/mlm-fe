import { DataGrid, type GridColDef, type GridPaginationModel } from '@mui/x-data-grid';
import React from 'react'
import { useTransactionsQuery } from '../../services/api';
import { tableFormat } from '../../utils/dateTIme';

export default function Transactions() {
  const [pagination, setPagination] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const skip = pagination.page * pagination.pageSize;
  const limit = pagination.pageSize;
  const { data: transactions, isLoading: transactionLoading } = useTransactionsQuery({ skip, limit })

  const columns: GridColDef[] = [
    { field: "_id", headerName: "#", width: 70 },
    {
      field: "lastAmountAdded",
      headerName: "Latest Amount added/deducted (₹)",
      width: 210
    },
    {
      field: "type",
      headerName: "Type",
      width: 100
    },

    {
      field: "balance",
      headerName: "Balance",
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
      rows={transactions?.data ?? []}
      getRowId={(row) => row._id}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
      pageSizeOptions={[10]}
      onPaginationModelChange={setPagination}
      disableRowSelectionOnClick
      loading={transactionLoading}
    />
  )
}
