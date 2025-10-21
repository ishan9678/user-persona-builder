import type { ProcessStage } from './types';

type StageConfig = {
  message: string;
  progress: number;
};

export const STAGE_CONFIG: Record<ProcessStage, StageConfig> = {
  idle: {
    message: 'Ready to start',
    progress: 0,
  },
  scraping: {
    message: 'Scraping website content...',
    progress: 15,
  },
  'product-profile': {
    message: 'Creating product profile...',
    progress: 35,
  },
  'customer-profile': {
    message: 'Analyzing customer profile...',
    progress: 60,
  },
  'generating-personas': {
    message: 'Generating user personas...',
    progress: 85,
  },
  complete: {
    message: 'Personas generated successfully!',
    progress: 100,
  },
  error: {
    message: 'An error occurred',
    progress: 0,
  },
};

export function getStageConfig(stage: ProcessStage): StageConfig {
  return STAGE_CONFIG[stage];
}
