'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CustomerProfile } from '../persona-generator/types';

type CustomerProfileDisplayProps = {
  customerProfile: CustomerProfile;
};

export function CustomerProfileDisplay({ customerProfile }: CustomerProfileDisplayProps) {
  const isB2B = customerProfile.type === 'B2B';

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
        Ideal Customer Profile
      </h2>

      <Card className="p-6 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
        <div className="space-y-4">
          {/* Customer Type Badge */}
          <div>
            <Badge 
              variant={isB2B ? 'default' : 'secondary'}
              className="border-2 border-black dark:border-white font-bold text-base px-3 py-1"
            >
              {customerProfile.type} Customer
            </Badge>
          </div>

          {/* B2B Specific Fields */}
          {isB2B && (
            <>
              {customerProfile.industrySegment && (
                <div>
                  <span className="font-bold text-sm uppercase">Industry Segment:</span>
                  <p className="mt-1">{customerProfile.industrySegment}</p>
                </div>
              )}

              {customerProfile.companySize && (
                <div>
                  <span className="font-bold text-sm uppercase">Company Size:</span>
                  <p className="mt-1">{customerProfile.companySize}</p>
                </div>
              )}

              {customerProfile.decisionMakers && customerProfile.decisionMakers.length > 0 && (
                <div>
                  <span className="font-bold text-sm uppercase">Decision Makers:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {customerProfile.decisionMakers.map((dm, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline"
                        className="border-2 border-black dark:border-white font-medium"
                      >
                        {dm}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* B2C Specific Fields */}
          {!isB2B && (
            <>
              {customerProfile.ageRange && (
                <div>
                  <span className="font-bold text-sm uppercase">Age Range:</span>
                  <p className="mt-1">{customerProfile.ageRange}</p>
                </div>
              )}

              {customerProfile.incomeProfession && (
                <div>
                  <span className="font-bold text-sm uppercase">Income / Profession:</span>
                  <p className="mt-1">{customerProfile.incomeProfession}</p>
                </div>
              )}

              {customerProfile.lifestyle && (
                <div>
                  <span className="font-bold text-sm uppercase">Lifestyle:</span>
                  <p className="mt-1">{customerProfile.lifestyle}</p>
                </div>
              )}
            </>
          )}

          {/* Common Fields */}
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
            <span className="font-bold text-sm uppercase">Use Cases:</span>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              {customerProfile.useCases.map((useCase, idx) => (
                <li key={idx}>{useCase}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-bold text-sm uppercase">Fit Criteria:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {customerProfile.fitCriteria.map((criteria, idx) => (
                <Badge 
                  key={idx} 
                  className="border-2 border-green-600 dark:border-green-400 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 font-medium"
                >
                  ✓ {criteria}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <span className="font-bold text-sm uppercase">Exclusion Criteria:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {customerProfile.exclusionCriteria.map((criteria, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline"
                  className="border-2 border-red-600 dark:border-red-400 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 font-medium"
                >
                  ✗ {criteria}
                </Badge>
              ))}
            </div>
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
