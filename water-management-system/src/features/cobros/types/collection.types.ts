
export type CollectionSummary = {
  paymentId: number;
  billId: number;
  partnerId: number;
  meterId: number;
  partnerIdentification: string | null;
  meterNumber: string;
  period: string;
  paymentAmount: number;
  paymentMethod: string;
  reference: string;
  paymentStatus: string;
  paymentDate: string;
  observation: string | null;
  billTotalAmount: number | null;
  billPaidAmount: number | null;
  billPendingBalance: number | null;
  billStatus: string | null;
  creationDate: string;
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

export type PendingCollectionItem = {
  itemId: number;
  itemType: string;
  description: string;
  amount: number;
  paidAmount: number;
  pendingAmount: number;
};

export type PendingCollectionBill = {
  billId: number;
  billStatus: string;
  partnerIdentification: string;
  partnerName: string | null;
  meterNumber: string;
  period: string;
  items: PendingCollectionItem[];
};

export type SelectablePendingItem = PendingCollectionItem & {
  billId: number;
  billStatus: string;
  partnerIdentification: string;
  partnerName: string | null;
  meterNumber: string;
  period: string;
};

export type CreateCollectionByItemRequestItem = {
  billId: number;
  itemType: string;
  billPenaltyId?: number;
  paymentAmount: number;
};

export type CreateCollectionByItemsInput = {
  paymentMethod: string;
  paymentDate: string;
  observation?: string;
  items: CreateCollectionByItemRequestItem[];
};

export type CollectionByItemsResponse = {
  paymentId: number;
  paymentAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: string;
  reference?: string;
};