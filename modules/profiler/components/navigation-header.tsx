'use client';

import { Menu, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavigationHeaderProps = {
  showLinks: boolean;
  hasReports?: boolean;
  onToggleSidebar?: () => void;
};

export function NavigationHeader({ showLinks, hasReports, onToggleSidebar }: NavigationHeaderProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black dark:border-white bg-background shadow-[0_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0_4px_0px_0px_rgba(255,255,255,1)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {hasReports && onToggleSidebar && (
              <Button
                variant="outline"
                size="icon"
                onClick={onToggleSidebar}
                className="border-2 border-black dark:border-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                title="Toggle reports sidebar"
              >
                <FileText className="h-5 w-5" />
              </Button>
            )}
            <h2 className="text-xl font-black uppercase tracking-tight">
              User Persona Builder
            </h2>
          </div>
          
          {showLinks && (
            <nav className="flex items-center gap-6">
              <button
                onClick={() => scrollToSection('product-profile')}
                className="text-sm font-bold uppercase hover:underline underline-offset-4 transition-all"
              >
                Product
              </button>
              <button
                onClick={() => scrollToSection('customer-profile')}
                className="text-sm font-bold uppercase hover:underline underline-offset-4 transition-all"
              >
                ICP
              </button>
              <button
                onClick={() => scrollToSection('user-personas')}
                className="text-sm font-bold uppercase hover:underline underline-offset-4 transition-all"
              >
                Personas
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
