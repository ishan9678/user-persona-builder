'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ProductProfile, CustomerProfile } from '../persona-generator/types';

type IntermediateResultsProps = {
  productProfile?: ProductProfile;
  customerProfile?: CustomerProfile;
};

export function IntermediateResults({ 
  productProfile, 
  customerProfile 
}: IntermediateResultsProps) {
  if (!productProfile && !customerProfile) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-black uppercase tracking-tight">
        Analysis Results
      </h2>

      {productProfile && (
        <Card className="p-6 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
          <h3 className="text-xl font-black mb-4 uppercase">Product Profile</h3>
          
          <div className="space-y-4">
            <div>
              <span className="font-bold text-sm uppercase">Name:</span>
              <p className="mt-1">{productProfile.name}</p>
            </div>

            <div>
              <span className="font-bold text-sm uppercase">Category:</span>
              <p className="mt-1">{productProfile.category}</p>
            </div>

            <div>
              <span className="font-bold text-sm uppercase">Value Proposition:</span>
              <p className="mt-1">{productProfile.valueProposition}</p>
            </div>

            <div>
              <span className="font-bold text-sm uppercase">Key Features:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {productProfile.keyFeatures.map((feature, idx) => (
                  <Badge 
                    key={idx} 
                    className="border-2 border-black dark:border-white font-medium"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-sm uppercase">Visual Identity:</span>
              <div className="mt-2 space-y-2">
                <p><strong>Colors:</strong> {productProfile.visualIdentity.colorScheme}</p>
                <p><strong>Typography:</strong> {productProfile.visualIdentity.typography}</p>
                <p><strong>Style:</strong> {productProfile.visualIdentity.designStyle}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {customerProfile && (
        <Card className="p-6 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
          <h3 className="text-xl font-black mb-4 uppercase">Customer Profile</h3>
          
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
      )}
    </div>
  );
}
