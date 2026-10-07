export type CreatePenaltyInput = {
  penaltyTypeId: number;
  partnerId: number;
  meterId: number | null;
  period: string;
  partnerIdentification: string;
  meterNumber: string | null;
  amount?: number;
  observation: string;
};


export type PenaltyResponse = {
  penaltyId: number;
  penaltyTypeId: number;
  partnerId: number;
  meterId: number | null;
  period: string;
  partnerIdentification: string;
  meterNumber: string | null;
  penaltyCode: string;
  penaltyName: string;
  amount: number;
  status: string;
  observation: string;
  applicationDate: string;
  creationDate: string;
  updateDate: string | null;
};


export type PenaltySummary = {
  penaltyId: number;
  penaltyTypeId: number;
  partnerId: number;
  meterId: number | null;
  period: string;
  partnerIdentification: string;
  meterNumber: string | null;
  penaltyCode: string;
  penaltyName: string;
  amount: number;
  status: string;
  observation: string | null;
  applicationDate: string;
  creationDate: string;
  updateDate: string | null;
};

export type PenaltiesPageResponse = {
  content: PenaltySummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};