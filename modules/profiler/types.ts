export type ProcessStage = 
  | 'idle'
  | 'scraping'
  | 'product-profile'
  | 'customer-profile'
  | 'generating-personas'
  | 'complete'
  | 'error';

export type ProcessState = {
  stage: ProcessStage;
  message: string;
  progress: number;
};
