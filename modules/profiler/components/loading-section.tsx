interface LoadingSectionProps {
  id: string;
  loading: boolean;
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export function LoadingSection({ id, loading, fallback, children }: LoadingSectionProps) {
  return (
    <section id={id} className="scroll-mt-20">
      {loading ? fallback : children}
    </section>
  );
}
