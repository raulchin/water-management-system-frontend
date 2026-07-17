import { billingApiClient } from "../../../config/apiClient";
import type {
  CollectionSummary,
  PendingInvoice,
  CreateBatchCollectionInput,
  CollectionResponse
} from "../types/collection.types";

type LatestCollectionsResponse = {
  codResult: string;
  message: string;
  data: CollectionSummary[];
};

export async function getLatestCollections(): Promise<CollectionSummary[]> {
  const response =
    await billingApiClient.get<LatestCollectionsResponse>("/cobros/latest");

  return response.data.data;
}

type PendingInvoicesResponse = {
  codResult: string;
  message: string;
  data: PendingInvoice[];
};

export async function getPendingInvoicesByIdentification(
  identification: string,
): Promise<PendingInvoice[]> {
  const response = await billingApiClient.get<PendingInvoicesResponse>(
    "/facturas/pending",
    {
      params: {
        identification,
      },
    },
  );

  return response.data.data;
}


type CreateBatchCollectionResponse = {
  codResult: string;
  message: string;
  data: CollectionResponse[];
};

export async function createBatchCollection(
  data: CreateBatchCollectionInput,
): Promise<CollectionResponse[]> {
  console.log("Payload registrar cobro:", JSON.stringify(data, null, 2));

  const response =
    await billingApiClient.post<CreateBatchCollectionResponse>(
      "/cobros/batch",
      data,
    );

  console.log("Respuesta registrar cobro:", response.data);

  return response.data.data;
}
