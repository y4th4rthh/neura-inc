export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
      {children}
    </span>
  );
}
