import { NextResponse } from "next/server";

const MIN_SUBMIT_TIME_MS = 3000;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, accommodationType, cabinName, checkIn, checkOut, guests, pets, message, website, confirmEmail, _t } = body;

    // Honeypot: bots fill hidden fields that humans never see
    if (website || confirmEmail) {
      // Return fake success so bots think it worked
      return NextResponse.json({ success: true });
    }

    // Timing: reject submissions faster than a human can type
    if (_t && Date.now() - _t < MIN_SUBMIT_TIME_MS) {
      return NextResponse.json({ success: true });
    }

    const errors: Record<string, string> = {};
    if (!name || typeof name !== "string" || !name.trim()) {
      errors.name = "Full name is required";
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "A valid email address is required";
    }
    if (!accommodationType || typeof accommodationType !== "string") {
      errors.accommodationType = "Please select an inquiry type";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Phase 2: Replace with SendGrid/Resend email integration
    console.log("Inquiry received:", {
      name: name.trim(),
      email: email.trim(),
      phone,
      accommodationType,
      cabinName,
      checkIn,
      checkOut,
      guests,
      pets,
      message,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
