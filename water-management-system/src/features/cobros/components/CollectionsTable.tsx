import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import type { CollectionSummary } from "../types/collection.types";

type Props = {
  collections: CollectionSummary[];
  onViewDetails: (collection: CollectionSummary) => void;
};

const currencyFormatter = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
});

function getStatusClass(status: string) {
  if (status === "REGISTRADO") {
    return "bg-green-500";
  }

  if (status === "ANULADO") {
    return "bg-red-500";
  }

  return "bg-[#5b35d5]";
}

export function CollectionsTable({ collections, onViewDetails }: Props) {
  const columns: ColumnDef<CollectionSummary>[] = [
    {
      accessorKey: "paymentId",
      header: "#",
      cell: ({ row }) => row.original.paymentId || "Sin medidor",
    },
    {
      accessorKey: "partnerIdentification",
      header: "Identificación",
      cell: ({ row }) => (
        <span className="font-semibold text-slate-900">
          {row.original.partnerIdentification ?? "Sin identificación"}
        </span>
      ),
    },
    {
      accessorKey: "meterNumber",
      header: "Medidor",
      cell: ({ row }) => row.original.meterNumber || "Sin medidor",
    },
    {
      accessorKey: "period",
      header: "Periodo",
    },
    {
      accessorKey: "paymentAmount",
      header: "Monto",
      cell: ({ row }) => (
        <span className="font-bold text-[#201a57]">
          {currencyFormatter.format(row.original.paymentAmount)}
        </span>
      ),
    },
    {
      accessorKey: "paymentMethod",
      header: "Método",
    },
    {
      accessorKey: "reference",
      header: "Referencia",
    },
    {
      accessorKey: "paymentDate",
      header: "Fecha pago",
    },
    {
      accessorKey: "paymentStatus",
      header: "Estado",
      cell: ({ row }) => (
        <div className="text-center">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${getStatusClass(
              row.original.paymentStatus,
            )}`}
          >
            {row.original.paymentStatus}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="text-center">
          <button
            type="button"
            onClick={() => onViewDetails(row.original)}
            className="rounded-lg border border-[#5b35d5] bg-white px-3 py-1 text-xs font-bold text-[#5b35d5] transition hover:bg-[#efe9ff]"
          >
            Ver detalle
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: collections,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[#303659]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-4 py-3 ${
                      header.column.id === "paymentStatus" ? "text-center" : ""
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-slate-100 transition hover:bg-slate-50"
              >
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

      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-slate-600">
          Mostrando {table.getRowModel().rows.length} de {collections.length}{" "}
          cobros
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-[#303659] shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="px-2 text-sm font-bold text-[#201a57]">
            Página {currentPage} de {totalPages}
          </span>

          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-[#303659] shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
