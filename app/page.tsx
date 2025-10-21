'use client';

import { useState } from 'react';
import { UrlInput } from '@/modules/landing/url-input';
import { ProductProfileDisplay } from '@/modules/landing/product-profile-display';
import { CustomerProfileDisplay } from '@/modules/landing/customer-profile-display';
import { UserPersonasDisplay } from '@/modules/landing/user-personas-display';
import { getStageConfig } from '@/modules/landing/config';
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
      const scrapingConfig = getStageConfig('scraping');
      setProcessState({
        stage: 'scraping',
        message: scrapingConfig.message,
        progress: scrapingConfig.progress,
      });

      const scrapedContent = await scrapeUrl(url);

      // Step 2: Generate product profile
      const productConfig = getStageConfig('product-profile');
      setProcessState({
        stage: 'product-profile',
        message: productConfig.message,
        progress: productConfig.progress,
      });

      // Prepare scraped content as JSON string
      const contentString = JSON.stringify(scrapedContent, null, 2);

      // Generate all profiles and personas
      const result = await generatePersonas(contentString, personaCount);

      // Update UI with product profile
      if (result.productProfile) {
        setProductProfile(result.productProfile);
        
        const customerConfig = getStageConfig('customer-profile');
        setProcessState({
          stage: 'customer-profile',
          message: customerConfig.message,
          progress: customerConfig.progress,
        });
      }

      // Update UI with customer profile
      if (result.customerProfile) {
        setCustomerProfile(result.customerProfile);
        
        const personasConfig = getStageConfig('generating-personas');
        setProcessState({
          stage: 'generating-personas',
          message: personasConfig.message,
          progress: personasConfig.progress,
        });
      }

      // Update UI with personas
      if (result.personas) {
        setPersonas(result.personas);
        
        const completeConfig = getStageConfig('complete');
        setProcessState({
          stage: 'complete',
          message: completeConfig.message,
          progress: completeConfig.progress,
        });
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      
      const errorConfig = getStageConfig('error');
      setProcessState({
        stage: 'error',
        message: errorConfig.message,
        progress: errorConfig.progress,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* URL Input Component */}
        <UrlInput onSubmit={handleSubmit} processState={processState} />
        
        {/* Error Display */}
        {error && (
          <div className="max-w-2xl mx-auto p-4 border-2 border-red-600 bg-red-50 dark:bg-red-950">
            <p className="font-bold text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Product Profile Component */}
        {productProfile && (
          <ProductProfileDisplay productProfile={productProfile} />
        )}

        {/* Customer Profile Component */}
        {customerProfile && (
          <CustomerProfileDisplay customerProfile={customerProfile} />
        )}

        {/* User Personas Component */}
        {personas && <UserPersonasDisplay personas={personas} />}
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
