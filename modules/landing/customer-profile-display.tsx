'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CustomerProfile } from '../persona-generator/types';

type CustomerProfileDisplayProps = {
  customerProfile: CustomerProfile;
};

export function CustomerProfileDisplay({ customerProfile }: CustomerProfileDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
        Customer Profile
      </h2>

      <Card className="p-6 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
        <div className="space-y-4">
          <div>
            <span className="font-bold text-sm uppercase">Industry Segment:</span>
            <p className="mt-1">{customerProfile.industrySegment}</p>
          </div>

          {customerProfile.companySize && (
            <div>
              <span className="font-bold text-sm uppercase">Company Size:</span>
              <p className="mt-1">{customerProfile.companySize}</p>
            </div>
          )}

          {customerProfile.budgetRange && (
            <div>
              <span className="font-bold text-sm uppercase">Budget Range:</span>
              <p className="mt-1">{customerProfile.budgetRange}</p>
            </div>
          )}

          <div>
            <span className="font-bold text-sm uppercase">Key Needs:</span>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              {customerProfile.keyNeeds.map((need, idx) => (
                <li key={idx}>{need}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-bold text-sm uppercase">Pain Points:</span>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              {customerProfile.painPoints.map((pain, idx) => (
                <li key={idx}>{pain}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-bold text-sm uppercase">Decision Drivers:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {customerProfile.decisionDrivers.map((driver, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline"
                  className="border-2 border-black dark:border-white font-medium"
                >
                  {driver}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
