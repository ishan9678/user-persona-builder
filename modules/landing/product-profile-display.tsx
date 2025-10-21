'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ProductProfile } from '../persona-generator/types';

type ProductProfileDisplayProps = {
  productProfile: ProductProfile;
};

export function ProductProfileDisplay({ productProfile }: ProductProfileDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
        Product Profile
      </h2>

      <Card className="p-6 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
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
            <span className="font-bold text-sm uppercase">Target Market:</span>
            <p className="mt-1">{productProfile.targetMarket}</p>
          </div>

          <div>
            <span className="font-bold text-sm uppercase">Brand Personality:</span>
            <p className="mt-1">{productProfile.brandPersonality}</p>
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
            <div className="mt-2 space-y-2 pl-4 border-l-4 border-primary">
              <p><strong>Colors:</strong> {productProfile.visualIdentity.colorScheme}</p>
              <p><strong>Typography:</strong> {productProfile.visualIdentity.typography}</p>
              <p><strong>Style:</strong> {productProfile.visualIdentity.designStyle}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
