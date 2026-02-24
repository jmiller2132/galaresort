export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-6">
        <span className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-river-blue tracking-wide">
          The Gala
        </span>
        <div className="h-0.5 w-16 bg-sand rounded-full animate-pulse" />
      </div>
    </div>
  );
}
