
export type MeterReadingStatus = 'REGISTRADA' | 'ANULADA' | 'VALIDADA'

export type MeterReading = {
 
  readingId: number;
  meterId: number;
  assignmentId: number;
  partnerId: number;
  period: string;
  readingDate: string;
  previousReading: number;
  currentReading: number;
  calculatedConsumption: number;
  status: MeterReadingStatus;
  observation: string | null;
  creationDate: string;
  updateDate: string | null;
  meterNumber: string;
  partnerIdentification: string;

}

export type CreateMeterReadingInput = {
  meterId: number
  assignmentId: number
  partnerId: number
  period: string
  readingDate: string
  previousReading: number
  currentReading: number
  status: MeterReadingStatus
  observation?: string
}

export type PreviousMeterReading = {
  meterId: number;
  period: string;
  previousPeriod: string;
  previousReading: number;
  hasPreviousReading: boolean;
};

export type MeterReadingsPageResponse = {

  content: MeterReading[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  
};

export type UpdateMeterReadingInput = {
  
  meterId: number;
  assignmentId: number;
  partnerId: number;
  period: string;
  readingDate: string;
  previousReading: number;
  currentReading: number;
  status: MeterReadingStatus;
  observation?: string;
  
};