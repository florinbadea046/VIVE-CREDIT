import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Settings2 } from "lucide-react";
import type { User } from "../../mock/Users.mock";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const baseBtn =
    "flex items-center justify-center gap-2 p-3 rounded-lg transition font-medium";

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className='flex items-center py-4 gap-4'>
        <div className='hidden md:block text-muted-foreground flex-1 text-sm'>
          {table.getFilteredSelectedRowModel().rows.length} din{" "}
          {table.getFilteredRowModel().rows.length} randuri selectate.
        </div>
        <Select
          value={(table.getColumn("role")?.getFilterValue() as string) ?? ""}
          onValueChange={(value) => {
            if (value === "tot") {
              table.getColumn("role")?.setFilterValue(undefined); // clear filter
            } else {
              table.getColumn("role")?.setFilterValue(value);
            }
          }}
        >
          <SelectTrigger className='w-auto'>
            <SelectValue placeholder='Filtreaza rol' />
          </SelectTrigger>
          <SelectContent className='dark:bg-[#0E151F]'>
            <SelectItem value='tot'>Tot</SelectItem>
            <SelectItem value='client'>Client</SelectItem>
            <SelectItem value='operator'>Operator</SelectItem>
            <SelectItem value='admin'>Admin</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={`${baseBtn} ml-auto font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white`}
            >
              <Settings2 />
              Vezi
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='dark:bg-[#0E151F]'>
            <DropdownMenuLabel>Comutați coloanele</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const isInactive = (row.original as User).status !== "active";
                console.log(isInactive);
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`${isInactive ? "opacity-50 bg-muted" : ""}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {table.getPageCount() > 1 && (
        <div className='flex items-center justify-end space-x-2 py-4'>
          <span className='text-sm text-muted-foreground'>
            Pagina <strong>{table.getState().pagination.pageIndex + 1}</strong>{" "}
            din <strong>{table.getPageCount()}</strong>
          </span>
          <Button
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`${baseBtn} bg-blue-600 hover:bg-blue-700 text-white`}
          >
            Previous
          </Button>

          <Button
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`${baseBtn} bg-blue-600 hover:bg-blue-700 text-white`}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
