// EmptyState.tsx
export function EmptyState({
  message = "No data found",
}: {
  message?: string;
}) {
  return <div className="text-sm text-muted-foreground">{message}</div>;
}

// ErrorState.tsx
export function ErrorState({
  message = "Something went wrong",
}: {
  message?: string;
}) {
  return <div className="text-sm text-destructive">{message}</div>;
}

// LoadingSkeleton.tsx
export function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-6 w-full animate-pulse rounded bg-muted" />
      ))}
    </div>
  );
}
