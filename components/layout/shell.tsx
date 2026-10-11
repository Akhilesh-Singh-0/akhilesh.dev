export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 justify-center">
      <div className="w-full max-w-2xl sm:border-x sm:border-rule">
        {children}
      </div>
    </div>
  );
}