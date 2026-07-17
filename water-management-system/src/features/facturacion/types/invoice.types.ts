export type InvoiceReading = {
  readingId: number
  meterId: number
  assignmentId: number
  partnerId: number
  partnerIdentification: string
  partnerName: string
  email?: string
  meterNumber: string
  period: string
  readingDate: string
  previousReading: number
  currentReading: number
  consumption: number
  status: string
}

export type CreateInvoiceInput = {
  readingId: number
  partnerIdentification: string
  partnerName: string
  baseFee: number
  consumptionAmount: number
  penaltyAmount: number
  discountAmount: number
  dueDate: string
  observation?: string
}

export type InvoiceResponse = {
  invoiceId: number
  readingId: number
  partnerIdentification: string
  partnerName: string
  totalAmount: number
  dueDate: string
  status: string
}

export type InvoiceSearchPartner = {
  partnerId: number;
  identification: string;
  fullName: string | null;
  email: string | null;
};

export type InvoiceSearchMeter = {
  meterId: number;
  assignmentId: number;
  meterNumber: string;
  brand: string;
  model: string;
};

export type InvoiceSearchReading = {
  readingId: number;
  period: string;
  readingDate: string;
  previousReading: number;
  currentReading: number;
  calculatedConsumption: number;
  status: string;
  observation: string | null;
};

export type InvoiceReadingSearchResult = {
  partner: InvoiceSearchPartner;
  meter: InvoiceSearchMeter;
  reading: InvoiceSearchReading;
};

export type InvoiceSummary = {
  billId: number;
  readingId: number;
  meterId: number;
  assignmentId: number;
  partnerId: number;
  period: string;
  partnerIdentification: string;
  partnerName: string;
  meterNumber: string;
  calculatedConsumption: number;
  baseFee: number;
  consumptionAmount: number;
  penaltyAmount: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  pendingBalance: number;
  issueDate: string;
  dueDate: string;
  status: "PENDIENTE" | "PAGADA" | "VENCIDA" | "ANULADA" | string;
  observation: string | null;
  creationDate: string;
  updateDate: string | null;
};