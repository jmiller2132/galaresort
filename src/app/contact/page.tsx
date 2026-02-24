import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";
import ContactForm from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Inquire about cabin rentals, seasonal sites, camping, or events at The Gala. We'll get back to you to confirm availability.",
};

const contactDetails = [
  {
    icon: MapPin,
    label: "Location",
    value: "Gala Resort & RV Park\nFremont, WI",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(920) 446-2423",
    href: "tel:+19204462423",
  },
  {
    icon: Mail,
    label: "Email",
    value: "galaresortllc@gmail.com",
    href: "mailto:galaresortllc@gmail.com",
  },
  {
    icon: Clock,
    label: "Season",
    value: "Open seasonally — check for dates",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in Touch"
        subtitle="Inquire about cabins, campsites, seasonal sites, or events"
        image="/images/wolf-river-new-london.png"
      />

      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <AnimateIn>
                <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-charcoal mb-2">
                  Reservation Inquiry
                </h2>
                <p className="text-river-gray mb-8">
                  Select what you&apos;re interested in and we&apos;ll get back
                  to you to confirm availability. All reservations are handled
                  via inquiry — no online booking at this time.
                </p>
              </AnimateIn>
              <AnimateIn delay={0.15}>
                <Suspense fallback={<div className="h-96 animate-pulse bg-sand/30 rounded-lg" />}>
                  <ContactForm />
                </Suspense>
              </AnimateIn>
            </div>

            <div>
              <AnimateIn delay={0.2}>
                <div className="bg-white rounded-lg p-8 shadow-sm border border-sand/50">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal mb-6">
                    Contact Info
                  </h3>
                  <div className="space-y-6">
                    {contactDetails.map((item) => (
                      <div key={item.label} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-river-blue/10 flex items-center justify-center flex-shrink-0">
                          <item.icon size={18} className="text-river-blue" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-charcoal">
                            {item.label}
                          </p>
                          {"href" in item ? (
                            <a href={item.href} className="text-sm text-river-gray hover:text-river-blue mt-0.5 block">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-sm text-river-gray whitespace-pre-line mt-0.5">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.3}>
                <div className="mt-6 bg-white rounded-lg overflow-hidden shadow-sm border border-sand/50">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45896.14972967567!2d-88.87!3d44.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8803e1c3a1a91f1d%3A0x4d0e5d6a2b1c3e0f!2sFremont%2C%20WI!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Gala Resort Location"
                    className="w-full"
                  />
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
