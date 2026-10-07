import { billingApiClient } from "../../../config/apiClient";
import type {
  CreatePenaltyInput,
  PenaltyResponse,
} from "../types/penalty.types";

import type { PenaltiesPageResponse } from "../types/penalty.types";

type CreatePenaltyResponse = {
  codResult: string;
  message: string;
  data: PenaltyResponse;
};

type PenaltiesResponse = {
  codResult: string;
  message: string;
  data: PenaltiesPageResponse;
};

export async function createPenalty(
  data: CreatePenaltyInput,
): Promise<PenaltyResponse> {
  console.log("Payload registrar multa:", JSON.stringify(data, null, 2));

  const response = await billingApiClient.post<CreatePenaltyResponse>(
    "/multas",
    data,
  );

  console.log("Respuesta registrar multa:", response.data);

  return response.data.data;
}

export async function getPenalties(
  page: number,
  size: number,
): Promise<PenaltiesPageResponse> {
  const response = await billingApiClient.get<PenaltiesResponse>("/multas", {
    params: {
      page,
      size,
    },
  });

  return response.data.data;
}

export async function billPenalty(penaltyId: number): Promise<void> {
  console.log('Crear factura para la multa: ', penaltyId);
  await billingApiClient.post<void>(`/multas/${penaltyId}/bill`);
}