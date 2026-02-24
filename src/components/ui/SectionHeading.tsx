import AnimateIn from "./AnimateIn";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"} max-w-3xl ${align === "center" ? "mx-auto" : ""}`}>
      {label && (
        <AnimateIn>
          <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${light ? "text-wood-light" : "text-river-blue"} mb-3`}>
            {label}
          </p>
        </AnimateIn>
      )}
      <AnimateIn delay={0.1}>
        <h2 className={`font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold ${light ? "text-white" : "text-charcoal"}`}>
          {title}
        </h2>
      </AnimateIn>
      {description && (
        <AnimateIn delay={0.2}>
          <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/70" : "text-river-gray"}`}>
            {description}
          </p>
        </AnimateIn>
      )}
    </div>
  );
}
