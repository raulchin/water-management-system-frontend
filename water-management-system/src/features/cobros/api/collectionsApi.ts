import { billingApiClient } from "../../../config/apiClient";

import type {
  CollectionSummary,
  PendingCollectionBill,
  CreateBatchCollectionInput,
  CollectionResponse,
  CreateCollectionByItemsInput,
  CollectionByItemsResponse,

} from "../types/collection.types";

type PendingCollectionItemsResponse = {
  codResult: string;
  message: string;
  data: PendingCollectionBill[];
};

type CreateCollectionByItemsResponse = {
  codResult: string;
  message: string;
  data: CollectionByItemsResponse[];
};

export async function createCollectionByItems(
  data: CreateCollectionByItemsInput,
): Promise<CollectionByItemsResponse[]> {
  console.log("Payload registrar cobro por items:", JSON.stringify(data, null, 2));

  const response = await billingApiClient.post<CreateCollectionByItemsResponse>(
    "/cobros/items",
    data,
  );

  console.log("Respuesta registrar cobro por items:", response.data);

  return response.data.data;
}


export async function getPendingInvoicesByIdentification(
  identification: string,
): Promise<PendingCollectionBill[]> {
  
  const response = await billingApiClient.get<PendingCollectionItemsResponse>(
    "/cobros/items-pendientes",
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

export async function getItemsCollections(): Promise<CollectionSummary[]> {
  const response =
    await billingApiClient.get<LatestCollectionsResponse>("/cobros/items");

  return response.data.data;
}