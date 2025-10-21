'use server';

import { runPersonaWorkflow } from './workflow';
import type { WorkflowState } from './types';

export type ProgressUpdate = {
  stage: string;
  data?: any;
};

export async function generatePersonas(
  scrapedContent: string,
  personaCount: number = 3
): Promise<WorkflowState> {
  try {
    const result = await runPersonaWorkflow(scrapedContent, personaCount);
    return result;
  } catch (error) {
    throw new Error(
      `Persona generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
