import { meterApiClient } from "../../../config/apiClient";
import type { CreateMeterInput, Medidor } from "../types/medidor.types";

type MedidoresResponse = {
  codResult: string;
  message: string;
  data: Medidor[];
};

type MeterResponse = {
  codResult: string;
  message: string;
  data: Medidor;
};

export async function obtenerMedidores(): Promise<Medidor[]> {
  const response = await meterApiClient.get<MedidoresResponse>("/medidores");
  return response.data.data;
}

export async function createMeter(data: CreateMeterInput): Promise<Medidor> {
  const response = await meterApiClient.post<MeterResponse>("/medidores", data);
  return response.data.data;
}
