
export type CollectionSummary = {
  paymentId: number;
  partnerIdentification: string | null;
  meterNumber: string;
  period: string;
  paymentAmount: number;
  paymentMethod: string;
  reference: string;
  paymentStatus: string;
  paymentDate: string;
};

export type PendingInvoice = {
  billId: number;
  observation: string | null;
  partnerIdentification: string;
  meterNumber: string;
  period: string;
  consumptionAmount: number;
  totalAmount: number;
  pendingBalance: number;
  status: "PENDIENTE" | "PAGO_PARCIAL" | string;
};

export type CreateBatchCollectionItem = {
  billId: number;
  paymentAmount: number;
};

export type CreateBatchCollectionInput = {
  paymentMethod: string;
  paymentDate: string;
  observation?: string;
  items: CreateBatchCollectionItem[];
};

export type CollectionResponse = {
  paymentId: number;
  reference: string;
  paymentAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: string;
};