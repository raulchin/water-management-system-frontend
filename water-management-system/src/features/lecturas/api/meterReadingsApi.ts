import { readingsApiClient } from "../../../config/apiClient";

import type {
  CreateMeterReadingInput,
  MeterReading,
  MeterReadingsPageResponse,
  PreviousMeterReading,
  UpdateMeterReadingInput,
} from "../types/meterReading.types";

type MeterReadingsResponse = {
  codResult: string;
  message: string;
  data: MeterReadingsPageResponse;
};

type MeterReadingResponse = {
  codResult: string;
  message: string;
  data: MeterReading;
};

export async function getMeterReadings(
  page: number,
  size: number,
): Promise<MeterReadingsPageResponse> {

  const response =
    await readingsApiClient.get<MeterReadingsResponse>(
      "/lecturas-medidor",
    {
      params:{
        page,
        size,
      },
    },
  );

  console.log("Respuesta lecturas:", response.data);

  return response.data.data;

}

export async function createMeterReading(
  data: CreateMeterReadingInput,
): Promise<MeterReading> {
  console.log("Payload registrar lectura:", JSON.stringify(data, null, 2));

  try {
    const response = await readingsApiClient.post<MeterReadingResponse>(
      "/lecturas-medidor",
      data,
    );

    console.log("Respuesta registrar lectura:", response.data);

    return response.data.data;
  } catch (error: any) {
    console.error("Error registrar lectura:", error.response?.data);
    throw error;
  }
}

type PreviousMeterReadingResponse = {
  codResult: string;
  message: string;
  data: PreviousMeterReading;
};

export async function getPreviousMeterReading(
  meterId: number,
  period: string,
): Promise<PreviousMeterReading> {
  const response = await readingsApiClient.get<PreviousMeterReadingResponse>(
    `/lecturas-medidor/medidor/${meterId}/previous`,
    {
      params: {
        period,
      },
    },
  );

  return response.data.data;
}


export async function updateMeterReading(

  readingId: number,
  data: UpdateMeterReadingInput,
  
): Promise<MeterReading> {
  
  console.log("Payload actualizar lectura:", JSON.stringify(data, null, 2));

  const response = await readingsApiClient.put<MeterReadingResponse>(
    `/lecturas-medidor/${readingId}`,
    data,
  );

  console.log("Respuesta actualizar lectura:", response.data);

  return response.data.data;

}