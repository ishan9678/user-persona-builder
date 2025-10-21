import type { ProductProfile, CustomerProfile, UserPersona } from '@/modules/llm/types';

export type ReportEntry = {
  id: string;
  url: string;
  timestamp: number;
  reportData: {
    productProfile: ProductProfile;
    customerProfile: CustomerProfile;
    userPersonas: UserPersona[];
  };
};

export type ReportStorage = {
  reports: ReportEntry[];
};
