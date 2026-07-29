import type { Socio } from "../types/socio.types";

import {
  Pencil,
  Trash2,
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
} from "lucide-react";

import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

type Props = {
  socios: Socio[];
  onEdit: (socio: Socio) => void;
};

function SortIcon({ sorted }: { sorted: false | "asc" | "desc" }) {
  if (sorted === "asc") {
    return <ArrowUp size={15} className="text-[#4b2cb1]" />;
  }

  if (sorted === "desc") {
    return <ArrowDown size={15} className="text-[#4b2cb1]" />;
  }

  return <ChevronsUpDown size={15} className="text-slate-400" />;
}

export function SociosTable({ socios, onEdit }: Props) {
  const [globalFilter, setGlobalFilter] = useState("");

  const columns: ColumnDef<Socio>[] = [
    {
      accessorKey: "names",
      header: "Nombres",
      cell: ({ row }) => (
        <span className="font-semibold text-slate-900">
          {row.original.names} {row.original.lastName}
        </span>
      ),
    },
    {
      accessorKey: "taxIdentification",
      header: "Cedula/RUC",
    },
    {
      accessorKey: "phone",
      header: "Telefono",
      cell: ({ getValue }) => getValue<string>() ?? "-",
    },
    {
      accessorKey: "address",
      header: "Direccion",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => getValue<string>() ?? "-",
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${
            row.original.status ? "bg-green-500" : "bg-pink-600"
          }`}
        >
          {row.original.status ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(row.original)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 transition hover:bg-blue-100"
            aria-label="Editar socio"
          >
            <Pencil size={17} />
          </button>

        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: socios,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  if (socios.length === 0) {
    return (
      <p className="text-sm text-slate-600">No existen socios registrados.</p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder="Buscar socio..."
          className="h-11 w-full max-w-sm rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
        />

        <p className="text-sm font-semibold text-slate-500">
          Total: {table.getFilteredRowModel().rows.length}
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="cursor-pointer px-4 py-3 font-bold"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {header.column.getCanSort() ? (
                          <SortIcon sorted={header.column.getIsSorted()} />
                        ) : null}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Anterior
          </button>

          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>

        <span className="text-sm font-semibold text-slate-600">
          Pagina {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(event) => table.setPageSize(Number(event.target.value))}
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700"
        >
          {[5, 10, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
