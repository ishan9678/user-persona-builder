'use client';

import { useState } from 'react';
import { UrlInput } from '@/modules/landing/url-input';
import { IntermediateResults } from '@/modules/landing/intermediate-results';
import { PersonaResults } from '@/modules/landing/persona-results';
import { scrapeUrl } from '@/modules/scraper';
import { generatePersonas } from '@/modules/persona-generator';
import type { ProcessState } from '@/modules/landing/types';
import type { ProductProfile, CustomerProfile, UserPersona } from '@/modules/persona-generator/types';

export default function Home() {
  const [processState, setProcessState] = useState<ProcessState>({
    stage: 'idle',
    message: '',
    progress: 0,
  });
  
  const [productProfile, setProductProfile] = useState<ProductProfile>();
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile>();
  const [personas, setPersonas] = useState<UserPersona[]>();
  const [error, setError] = useState<string>();

  const handleSubmit = async (url: string, personaCount: number) => {
    try {
      setError(undefined);
      setProductProfile(undefined);
      setCustomerProfile(undefined);
      setPersonas(undefined);

      // Step 1: Scrape URL
      setProcessState({
        stage: 'scraping',
        message: 'Scraping website...',
        progress: 10,
      });

      const scrapedContent = await scrapeUrl(url);
      
      setProcessState({
        stage: 'scraping',
        message: 'Website scraped successfully',
        progress: 25,
      });

      // Step 2: Generate personas with progress updates
      setProcessState({
        stage: 'product-profile',
        message: 'Creating product profile...',
        progress: 35,
      });

      // Prepare scraped content as JSON string
      const contentString = JSON.stringify(scrapedContent, null, 2);

      // Generate all profiles and personas
      const result = await generatePersonas(contentString, personaCount);

      // Update UI with intermediate results
      if (result.productProfile) {
        setProductProfile(result.productProfile);
        setProcessState({
          stage: 'customer-profile',
          message: 'Product profile created',
          progress: 55,
        });
      }

      if (result.customerProfile) {
        setCustomerProfile(result.customerProfile);
        setProcessState({
          stage: 'generating-personas',
          message: 'Creating customer profile...',
          progress: 75,
        });
      }

      if (result.personas) {
        setPersonas(result.personas);
        setProcessState({
          stage: 'complete',
          message: 'Personas generated successfully!',
          progress: 100,
        });
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setProcessState({
        stage: 'error',
        message: 'An error occurred',
        progress: 0,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 space-y-12">
        <UrlInput onSubmit={handleSubmit} processState={processState} />
        
        {error && (
          <div className="max-w-2xl mx-auto p-4 border-2 border-red-600 bg-red-50 dark:bg-red-950">
            <p className="font-bold text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <IntermediateResults 
          productProfile={productProfile}
          customerProfile={customerProfile}
        />

        {personas && <PersonaResults personas={personas} />}
      </main>

      <footer className="border-t-2 border-black dark:border-white mt-20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold text-sm uppercase tracking-wide">
            User Persona Builder
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Powered by Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
}
