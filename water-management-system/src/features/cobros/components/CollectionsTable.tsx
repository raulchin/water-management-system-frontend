import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import type { CollectionSummary } from "../types/collection.types";

import { useState } from "react";

type Props = {
  collections: CollectionSummary[];
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

export function CollectionsTable({ collections }: Props) {
  const [expandedPaymentId, setExpandedPaymentId] = useState<number | null>(
    null,
  );

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
      cell: ({ row }) => {
        const collection = row.original;
        const isExpanded = expandedPaymentId === collection.paymentId;

        return (
          <div className="text-center">
            <button
              type="button"
              onClick={() =>
                setExpandedPaymentId(isExpanded ? null : collection.paymentId)
              }
              className="rounded-lg border border-[#5b35d5] bg-white px-3 py-1 text-xs font-bold text-[#5b35d5] transition hover:bg-[#efe9ff]"
            >
              {isExpanded ? "Ocultar" : "Ver detalle"}
            </button>
          </div>
        );
      },
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
            
            

            {table.getRowModel().rows.map((row) => {
              const collection = row.original;
              const isExpanded = expandedPaymentId === collection.paymentId;

              return (
                <>
                  <tr
                    key={row.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>

                  {isExpanded ? (
                    <tr
                      key={`${row.id}-detail`}
                      className="border-t border-slate-100 bg-[#fbf8ff]"
                    >
                      <td
                        colSpan={row.getVisibleCells().length}
                        className="px-4 py-4"
                      >
                        <div className="grid gap-4 text-sm md:grid-cols-3">
                          <div>
                            <p className="font-bold text-[#303659]">ID cobro</p>
                            <p className="text-slate-700">
                              {collection.paymentId}
                            </p>
                          </div>

                          <div>
                            <p className="font-bold text-[#303659]">
                              ID factura
                            </p>
                            <p className="text-slate-700">
                              {collection.billId}
                            </p>
                          </div>

                          <div>
                            <p className="font-bold text-[#303659]">ID socio</p>
                            <p className="text-slate-700">
                              {collection.partnerId}
                            </p>
                          </div>

                          <div>
                            <p className="font-bold text-[#303659]">
                              ID medidor
                            </p>
                            <p className="text-slate-700">
                              {collection.meterId}
                            </p>
                          </div>

                          <div>
                            <p className="font-bold text-[#303659]">
                              Total factura
                            </p>
                            <p className="text-slate-700">
                              {collection.billTotalAmount == null
                                ? "No disponible"
                                : currencyFormatter.format(
                                    collection.billTotalAmount,
                                  )}
                            </p>
                          </div>

                          <div>
                            <p className="font-bold text-[#303659]">
                              Pagado factura
                            </p>
                            <p className="text-slate-700">
                              {collection.billPaidAmount == null
                                ? "No disponible"
                                : currencyFormatter.format(
                                    collection.billPaidAmount,
                                  )}
                            </p>
                          </div>

                          <div>
                            <p className="font-bold text-[#303659]">
                              Saldo pendiente
                            </p>
                            <p className="text-slate-700">
                              {collection.billPendingBalance == null
                                ? "No disponible"
                                : currencyFormatter.format(
                                    collection.billPendingBalance,
                                  )}
                            </p>
                          </div>

                          <div>
                            <p className="font-bold text-[#303659]">
                              Estado factura
                            </p>
                            <p className="text-slate-700">
                              {collection.billStatus ?? "No disponible"}
                            </p>
                          </div>

                          <div>
                            <p className="font-bold text-[#303659]">
                              Fecha creación
                            </p>
                            <p className="text-slate-700">
                              {collection.creationDate}
                            </p>
                          </div>

                          <div className="md:col-span-3">
                            <p className="font-bold text-[#303659]">
                              Observación
                            </p>
                            <p className="text-slate-700">
                              {collection.observation || "Sin observación"}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </>
              );
            })}
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
