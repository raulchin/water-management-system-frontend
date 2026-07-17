import { billingApiClient, readingsApiClient } from "../../../config/apiClient";
import type { CreateInvoiceInput, InvoiceReading, InvoiceResponse, InvoiceSummary } from "../types/invoice.types";
import type { InvoiceReadingSearchResult } from "../types/invoice.types";


type SearchReadingsResponse = {
  codResult: string
  message: string
  data: InvoiceReading[]
}

type CreateInvoiceResponse = {
  codResult: string
  message: string
  data: InvoiceResponse
}

type SearchReadingByPeriodAndMeterResponse = {
  codResult: string;
  message: string;
  data: InvoiceReadingSearchResult[];
};

type LatestInvoicesResponse = {
  codResult: string;
  message: string;
  data: InvoiceSummary[];
};

export async function searchReadingsByPartnerIdentification(
  identification: string,
): Promise<InvoiceReading[]> {
  const response = await readingsApiClient.get<SearchReadingsResponse>(
    `/lecturas-medidor/identificacion/${identification}`,
  );

  return response.data.data;
}

export async function createInvoice(data: CreateInvoiceInput): Promise<InvoiceResponse> {
  const response = await billingApiClient.post<CreateInvoiceResponse>("/facturas", data);
  return response.data.data;
}

export async function searchReadingsByPeriodAndMeterNumber(
  period: string,
  meterNumber: string,
): Promise<InvoiceReadingSearchResult[]> {
  const response =
    await readingsApiClient.get<SearchReadingByPeriodAndMeterResponse>(
      "/lecturas-medidor/search",
      {
        params: {
          period,
          meterNumber,
        },
      },
    );

  return response.data.data;
}

export async function getLatestInvoices(): Promise<InvoiceSummary[]> {
  const response =
    await billingApiClient.get<LatestInvoicesResponse>("/facturas/latest");

  return response.data.data;
}