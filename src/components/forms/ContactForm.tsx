"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cabins } from "@/lib/data";

interface FormData {
  name: string;
  email: string;
  phone: string;
  accommodationType: string;
  cabinName: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  pets: string;
  message: string;
  website: string;
  confirmEmail: string;
}

interface ContactFormProps {
  defaultCabin?: string;
  defaultType?: string;
  maxGuests?: number;
  onSuccess?: () => void;
}

export default function ContactForm({ defaultCabin, defaultType, maxGuests, onSuccess }: ContactFormProps = {}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [loadedAt] = useState(() => Date.now());
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      accommodationType: defaultCabin ? "cabin" : defaultType || "",
      cabinName: defaultCabin || "",
      pets: "no",
    },
  });

  const accommodationType = watch("accommodationType");
  const selectedCabinSlug = watch("cabinName");
  const selectedCabin = cabins.find((c) => c.slug === selectedCabinSlug);
  const guestMax = maxGuests || selectedCabin?.maxGuests || 20;

  useEffect(() => {
    if (selectedCabin && !selectedCabin.dogFriendly) {
      setValue("pets", "no");
    }
  }, [selectedCabin, setValue]);

  useEffect(() => {
    if (defaultCabin || defaultType) return;

    const cabinParam = searchParams.get("cabin");
    const typeParam = searchParams.get("type");

    if (cabinParam) {
      setValue("accommodationType", "cabin");
      setValue("cabinName", cabinParam);
    } else if (typeParam === "seasonal") {
      setValue("accommodationType", "seasonal");
    } else if (typeParam === "camping") {
      setValue("accommodationType", "camping");
    }
  }, [searchParams, setValue, defaultCabin, defaultType]);

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          _t: loadedAt,
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => {
    reset();
    setStatus("idle");
  };

  const baseInput =
    "w-full rounded-md border bg-white px-4 py-3 text-charcoal placeholder:text-river-gray/40 focus:ring-1 outline-none transition-colors";
  const validInput = `${baseInput} border-sand focus:border-river-blue focus:ring-river-blue`;
  const errorInput = `${baseInput} border-red-500 focus:border-red-500 focus:ring-red-500`;

  if (status === "success") {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 p-8 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle size={24} className="text-green-600" />
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-charcoal">
          Thank You!
        </h3>
        <p className="mt-2 text-river-gray leading-relaxed">
          We&apos;ve received your inquiry and will be in touch soon. Keep an
          eye on your inbox.
        </p>
        <button
          onClick={handleReset}
          className="mt-6 text-sm font-semibold text-river-blue hover:text-river-blue-light transition-colors underline underline-offset-2"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <>
      {status === "error" && (
        <div className="flex items-start gap-3 text-red-700 bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed">
            Something went wrong. Please try again, or reach out to us directly
            at{" "}
            <a
              href="mailto:galaresortllc@gmail.com"
              className="font-semibold underline"
            >
              galaresortllc@gmail.com
            </a>
            .
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10 overflow-hidden" aria-hidden="true" tabIndex={-1}>
          <label htmlFor="website">Website</label>
          <input id="website" type="text" autoComplete="off" tabIndex={-1} {...register("website")} />
          <label htmlFor="confirmEmail">Confirm Email</label>
          <input id="confirmEmail" type="email" autoComplete="off" tabIndex={-1} {...register("confirmEmail")} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1.5">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className={errors.name ? errorInput : validInput}
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">
              Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className={errors.email ? errorInput : validInput}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1.5">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="(555) 000-0000"
            className={validInput}
            {...register("phone")}
          />
        </div>

        <div>
          <label htmlFor="accommodationType" className="block text-sm font-medium text-charcoal mb-1.5">
            What are you interested in? *
          </label>
          <select
            id="accommodationType"
            className={errors.accommodationType ? errorInput : validInput}
            {...register("accommodationType", { required: "Please select an option" })}
          >
            <option value="">Select one...</option>
            <option value="cabin">Cabin Rental</option>
            <option value="seasonal">Seasonal Site</option>
            <option value="camping">Campsite</option>
            <option value="bar-events">Bar & Events Info</option>
            <option value="general">General Inquiry</option>
          </select>
          {errors.accommodationType && (
            <p className="mt-1 text-sm text-red-600">{errors.accommodationType.message}</p>
          )}
        </div>

        {accommodationType === "cabin" && (
          <div>
            <label htmlFor="cabinName" className="block text-sm font-medium text-charcoal mb-1.5">
              Which cabin?
            </label>
            <select id="cabinName" className={validInput} {...register("cabinName")}>
              <option value="">No preference</option>
              {cabins.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.seasonType === "year-round" ? "Year-Round" : "3-Season"})
                </option>
              ))}
            </select>
          </div>
        )}

        {(accommodationType === "cabin" || accommodationType === "camping") && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="checkIn" className="block text-sm font-medium text-charcoal mb-1.5">
                  Desired Check-In
                </label>
                <input id="checkIn" type="date" min={new Date().toISOString().split("T")[0]} className={validInput} {...register("checkIn")} />
              </div>
              <div>
                <label htmlFor="checkOut" className="block text-sm font-medium text-charcoal mb-1.5">
                  Desired Check-Out
                </label>
                <input id="checkOut" type="date" min={new Date().toISOString().split("T")[0]} className={validInput} {...register("checkOut")} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-charcoal mb-1.5">
                  Number of Guests
                </label>
                <input
                  id="guests"
                  type="number"
                  min="1"
                  max={guestMax}
                  placeholder="2"
                  className={validInput}
                  {...register("guests")}
                />
                {selectedCabin && (
                  <p className="mt-1 text-xs text-river-gray">Max {guestMax} for the {selectedCabin.name} cabin.</p>
                )}
              </div>
              <div>
                <label htmlFor="pets" className="block text-sm font-medium text-charcoal mb-1.5">
                  Bringing Pets?
                </label>
                {selectedCabin && !selectedCabin.dogFriendly ? (
                  <>
                    <input type="hidden" {...register("pets")} value="no" />
                    <p className="py-3 text-sm text-river-gray">Pets not available for this cabin.</p>
                  </>
                ) : (
                  <>
                    <select id="pets" className={validInput} {...register("pets")}>
                      <option value="no">No pets</option>
                      <option value="1-dog">Yes — 1 dog</option>
                      <option value="2-dogs">Yes — 2 dogs</option>
                    </select>
                    <p className="mt-1 text-xs text-river-gray">
                      {accommodationType === "camping" ? "2 dogs allowed per site." : "2 dogs allowed per cabin."}
                    </p>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Anything else we should know?"
            className={validInput}
            {...register("message")}
          />
        </div>

        <div className="bg-sand/30 rounded-md p-4 text-sm text-river-gray border border-sand/50">
          Submitting this form does not confirm a reservation. We&apos;ll follow
          up to confirm availability and finalize your booking.
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 font-semibold tracking-wide uppercase transition-all duration-300 rounded-md bg-river-blue text-white hover:bg-river-blue-light px-8 py-4 text-base w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" && <Loader2 size={18} className="animate-spin" />}
          {status === "sending" ? "Sending..." : "Submit Inquiry"}
        </button>
      </form>
    </>
  );
}
