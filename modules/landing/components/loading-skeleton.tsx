import { Card } from '@/components/ui/card';

export function ProductProfileSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto animate-pulse">
      <div className="h-8 w-48 bg-muted rounded mb-6"></div>
      <Card className="p-6 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
        <div className="space-y-4">
          <div className="h-6 w-32 bg-muted rounded"></div>
          <div className="h-4 w-full bg-muted rounded"></div>
          <div className="h-6 w-32 bg-muted rounded"></div>
          <div className="h-4 w-3/4 bg-muted rounded"></div>
          <div className="h-6 w-32 bg-muted rounded"></div>
          <div className="h-4 w-full bg-muted rounded"></div>
          <div className="h-4 w-5/6 bg-muted rounded"></div>
        </div>
      </Card>
    </div>
  );
}

export function CustomerProfileSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto animate-pulse">
      <div className="h-8 w-56 bg-muted rounded mb-6"></div>
      <Card className="p-6 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
        <div className="space-y-4">
          <div className="h-6 w-32 bg-muted rounded"></div>
          <div className="h-4 w-full bg-muted rounded"></div>
          <div className="h-6 w-32 bg-muted rounded"></div>
          <div className="h-4 w-2/3 bg-muted rounded"></div>
          <div className="h-6 w-32 bg-muted rounded"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded"></div>
            <div className="h-4 w-full bg-muted rounded"></div>
            <div className="h-4 w-4/5 bg-muted rounded"></div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function UserPersonasSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto animate-pulse">
      <div className="text-center mb-8">
        <div className="h-9 w-64 bg-muted rounded mx-auto mb-2"></div>
        <div className="h-4 w-48 bg-muted rounded mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="p-6 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]"
          >
            <div className="space-y-4">
              <div className="h-7 w-32 bg-muted rounded"></div>
              <div className="h-6 w-24 bg-muted rounded"></div>
              <div className="h-4 w-full bg-muted rounded"></div>
              <div className="h-4 w-5/6 bg-muted rounded"></div>
              <div className="h-4 w-4/6 bg-muted rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
