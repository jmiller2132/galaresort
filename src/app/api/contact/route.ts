import { NextResponse } from "next/server";
import { Resend } from "resend";

const MIN_SUBMIT_TIME_MS = 3000;

const NOTIFY_EMAIL = "galaresortllc@gmail.com";
const FROM_ADDRESS = "Gala Resort <onboarding@resend.dev>";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name, email, phone, accommodationType, cabinName,
      checkIn, checkOut, guests, pets, message,
      website, confirmEmail, _t,
    } = body;

    // Honeypot: bots fill hidden fields that humans never see
    if (website || confirmEmail) {
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

    const typeLabel: Record<string, string> = {
      cabin: "Cabin",
      camping: "Camping",
      seasonal: "Seasonal Site",
      general: "General",
    };

    const lines = [
      `<p><strong>Name:</strong> ${name.trim()}</p>`,
      `<p><strong>Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>`,
      phone ? `<p><strong>Phone:</strong> ${phone}</p>` : "",
      `<p><strong>Inquiry type:</strong> ${typeLabel[accommodationType] ?? accommodationType}</p>`,
      cabinName ? `<p><strong>Cabin:</strong> ${cabinName}</p>` : "",
      checkIn ? `<p><strong>Check-in:</strong> ${checkIn}</p>` : "",
      checkOut ? `<p><strong>Check-out:</strong> ${checkOut}</p>` : "",
      guests ? `<p><strong>Guests:</strong> ${guests}</p>` : "",
      pets ? `<p><strong>Pets:</strong> ${pets}</p>` : "",
      message ? `<hr/><p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>` : "",
    ].filter(Boolean).join("\n");

    const html = `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #1a3a5c;">New Inquiry — Gala Resort</h2>
        ${lines}
        <hr/>
        <p style="color: #888; font-size: 12px;">Sent from the contact form at galaresort.com</p>
      </div>
    `;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: NOTIFY_EMAIL,
      replyTo: email.trim(),
      subject: `New inquiry from ${name.trim()} — ${typeLabel[accommodationType] ?? accommodationType}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
