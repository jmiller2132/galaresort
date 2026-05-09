import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/data";
import { fetchCabins, fetchCabinBySlug } from "@/lib/sanity/fetch";
import CabinGallery from "@/components/rooms/CabinGallery";
import InquiryDrawer from "@/components/forms/InquiryDrawer";
import AnimateIn from "@/components/ui/AnimateIn";
import StickySidebar from "@/components/ui/StickySidebar";
import { Check, Calendar, ChevronLeft, AlertTriangle } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cabins = await fetchCabins();
  return cabins.map((cabin) => ({ slug: cabin.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cabin = await fetchCabinBySlug(slug);
  if (!cabin) return {};
  const seasonLabel = cabin.seasonType === "year-round" ? "year-round" : "three-season";
  const titleSuffix = cabin.name.includes("Cabin") ? "" : " Cabin";
  return {
    title: `${cabin.name}${titleSuffix}`,
    description: `${cabin.name} — a ${seasonLabel} waterfront cabin on the Wolf River. Sleeps ${cabin.maxGuests}. Starting at ${formatPrice(cabin.rateNightly)}/night.`,
  };
}

export default async function CabinDetailPage({ params }: Props) {
  const { slug } = await params;
  const cabin = await fetchCabinBySlug(slug);
  if (!cabin) notFound();

  const unavailable = cabin.available === false;

  return (
    <div className="pt-20 bg-cream">
      <div className="border-b border-sand/50 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/stay/cabins"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-river-gray hover:text-river-blue transition-colors"
          >
            <ChevronLeft size={16} />
            All Cabins
          </Link>
          <span className="text-xs text-river-gray hidden sm:inline">
            {cabin.seasonType === "year-round" ? "Four-Season Cabin" : "Three-Season Cabin"}
          </span>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <CabinGallery images={cabin.images} name={cabin.name} />
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <AnimateIn>
              <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
                {cabin.name}
              </h1>
              <p className="mt-6 text-river-gray text-lg leading-relaxed">
                {cabin.description}
              </p>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <div className="mt-10">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal mb-4">
                  What&apos;s Included
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {cabin.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-river-gray">
                      <Check size={16} className="text-forest flex-shrink-0" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            {cabin.dogFriendly && !unavailable && (
              <AnimateIn delay={0.2}>
                <div className="mt-10 bg-sand/30 rounded-lg p-5 border border-sand/50">
                  <p className="text-river-gray text-sm leading-relaxed">
                    <strong className="text-charcoal">Pets welcome</strong> — up to 2 dogs per cabin at $25 per pet. Dogs must be 25 lbs or less at full maturity.
                  </p>
                </div>
              </AnimateIn>
            )}
          </div>

          <div className="lg:col-span-1">
            <AnimateIn delay={0.2}>
              <StickySidebar className="bg-white rounded-lg p-8 border border-sand/50 sticky top-28">
                {unavailable ? (
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <AlertTriangle size={32} className="text-amber-500" />
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-charcoal mb-2">
                      Under Restoration
                    </h3>
                    <p className="text-river-gray text-sm leading-relaxed mb-4">
                      This cabin sustained water damage and is currently being renovated. It is not available for reservations at this time.
                    </p>
                    <Link
                      href="/stay/cabins"
                      className="block text-center text-sm font-semibold text-river-blue hover:underline"
                    >
                      View available cabins
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-river-gray text-sm">Per night</span>
                        <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-charcoal">
                          {formatPrice(cabin.rateNightly)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-river-gray text-sm">Per week</span>
                        <span className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal">
                          {formatPrice(cabin.rateWeekly)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-river-gray pt-2 border-t border-sand/50">
                        <Calendar size={14} />
                        {cabin.minNights}-night minimum (3 on holidays)
                      </div>
                    </div>
                    <p className="text-xs text-river-gray mb-1">
                      All rates + taxes &amp; fees. Availability confirmed after inquiry.
                    </p>
                    <p className="text-xs text-river-gray mb-4">
                      Holiday weeks and weekends are subject to a surcharge. Contact us for holiday pricing.
                    </p>
                    <InquiryDrawer type="cabin" cabinSlug={cabin.slug} cabinName={cabin.name} maxGuests={cabin.maxGuests} />
                  </>
                )}
              </StickySidebar>
            </AnimateIn>
          </div>
        </div>
      </section>
    </div>
  );
}
