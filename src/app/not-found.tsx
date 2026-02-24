import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 bg-cream">
      <div className="text-center max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-river-blue mb-4">
          404
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-charcoal">
          Page Not Found
        </h1>
        <p className="mt-4 text-river-gray text-lg">
          Looks like this spot on the river doesn&apos;t exist. Let&apos;s get
          you back on course.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
