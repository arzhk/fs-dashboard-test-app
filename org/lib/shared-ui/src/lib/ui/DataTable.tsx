"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";
import { ReactNode } from "react";
import { useState } from "react";

export interface Column<T> {
  id: string;
  label: string;
  width?: string;
  align?: "right" | "left" | "center";
  format?: (value: unknown) => ReactNode;
  accessor: (row: T) => unknown;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
  title?: string;
  pagination?: boolean;
  defaultRowsPerPage?: number;
  rowsPerPageOptions?: number[];
}

export function DataTable<T>({
  columns,
  rows,
  loading = false,
  title,
  pagination = true,
  defaultRowsPerPage = 10,
  rowsPerPageOptions = [5, 10, 25, 50],
}: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayedRows = pagination ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows;

  return (
    <Paper elevation={0}>
      {title && (
        <Box px={3} py={2}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        </Box>
      )}

      {loading && <LinearProgress />}

      <TableContainer>
        <Table stickyHeader style={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    width: column.width,
                    paddingLeft: index === 0 ? "24px" : undefined,
                    paddingRight: index === columns.length - 1 ? "24px" : undefined,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, rowIndex) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                {columns.map((column, colIndex) => {
                  const value = column.accessor(row);
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        paddingLeft: colIndex === 0 ? "24px" : undefined,
                        paddingRight: colIndex === columns.length - 1 ? "24px" : undefined,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {column.format ? column.format(value) : (
                        typeof value === 'string' || typeof value === 'number' ?
                          value :
                          String(value)
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
