'use client';

import { useState } from 'react';
import { NavigationHeader } from '@/modules/profiler/components/navigation-header';
import { UrlInput } from '@/modules/profiler/url-input';
import { ProductProfileCard } from '@/modules/profiler/product-profile-card';
import { CustomerProfileCard } from '@/modules/profiler/customer-profile-card';
import { UserPersonasDisplay } from '@/modules/profiler/persona/user-personas-display';
import { ProductProfileSkeleton, CustomerProfileSkeleton, UserPersonasSkeleton } from '@/modules/profiler/components/loading-skeleton';
import { getStageConfig } from '@/modules/profiler/config';
import { scrapeUrl } from '@/modules/scraper';
import { generateProductProfile, generateCustomerProfile, generateUserPersonas } from '@/modules/llm';
import type { ProcessState } from '@/modules/profiler/types';
import type { ProductProfile, CustomerProfile, UserPersona } from '@/modules/llm/types';

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
  
  // Loading states for each section
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  const [loadingPersonas, setLoadingPersonas] = useState(false);

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
      const contentString = JSON.stringify(scrapedContent, null, 2);

      // Step 2: Generate Product Profile
      const productConfig = getStageConfig('product-profile');
      setProcessState({
        stage: 'product-profile',
        message: productConfig.message,
        progress: productConfig.progress,
      });
      setLoadingProduct(true);

      const productProfileResult = await generateProductProfile(contentString);
      setProductProfile(productProfileResult);
      setLoadingProduct(false);

      // Step 3: Generate Customer Profile
      const customerConfig = getStageConfig('customer-profile');
      setProcessState({
        stage: 'customer-profile',
        message: customerConfig.message,
        progress: customerConfig.progress,
      });
      setLoadingCustomer(true);

      const customerProfileResult = await generateCustomerProfile(productProfileResult);
      setCustomerProfile(customerProfileResult);
      setLoadingCustomer(false);

      // Step 4: Generate User Personas
      const personasConfig = getStageConfig('generating-personas');
      setProcessState({
        stage: 'generating-personas',
        message: personasConfig.message,
        progress: personasConfig.progress,
      });
      setLoadingPersonas(true);

      const personasResult = await generateUserPersonas(
        productProfileResult,
        customerProfileResult,
        personaCount
      );
      setPersonas(personasResult);
      setLoadingPersonas(false);

      // Complete
      const completeConfig = getStageConfig('complete');
      setProcessState({
        stage: 'complete',
        message: completeConfig.message,
        progress: completeConfig.progress,
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoadingProduct(false);
      setLoadingCustomer(false);
      setLoadingPersonas(false);
      
      const errorConfig = getStageConfig('error');
      setProcessState({
        stage: 'error',
        message: errorConfig.message,
        progress: errorConfig.progress,
      });
    }
  };

  const hasResults = !!(productProfile || customerProfile || personas || loadingProduct || loadingCustomer || loadingPersonas);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation Header */}
      <NavigationHeader showLinks={hasResults} />

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
        {loadingProduct && (
          <section id="product-profile" className="scroll-mt-20">
            <ProductProfileSkeleton />
          </section>
        )}
        {productProfile && !loadingProduct && (
          <section id="product-profile" className="scroll-mt-20">
            <ProductProfileCard productProfile={productProfile} />
          </section>
        )}

        {/* Customer Profile Component */}
        {loadingCustomer && (
          <section id="customer-profile" className="scroll-mt-20">
            <CustomerProfileSkeleton />
          </section>
        )}
        {customerProfile && !loadingCustomer && (
          <section id="customer-profile" className="scroll-mt-20">
            <CustomerProfileCard customerProfile={customerProfile} />
          </section>
        )}

        {/* User Personas Component */}
        {loadingPersonas && (
          <section id="user-personas" className="scroll-mt-20">
            <UserPersonasSkeleton />
          </section>
        )}
        {personas && !loadingPersonas && (
          <section id="user-personas" className="scroll-mt-20">
            <UserPersonasDisplay personas={personas} productProfile={productProfile} />
          </section>
        )}
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
