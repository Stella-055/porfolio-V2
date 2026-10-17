import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please add your name.")
    .max(100, "Name must be under 100 characters."),
  email: z
    .string()
    .trim()
    .email("Please add a valid email address.")
    .max(255, "Email must be under 255 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Please write a slightly longer message.")
    .max(2000, "Message must be under 2000 characters."),
  // Honeypot field: real visitors never fill this in.
  company: z.string().max(200).optional().default(""),
});

const clientContext = createMiddleware().server(async ({ next, request }) => {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return next({ context: { ip } });
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .middleware([clientContext])
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data, context }) => {
    // Honeypot filled in → almost certainly a bot. Pretend success, send nothing.
    if (data.company) return { ok: true as const };

    const { rateLimit, sendContactEmail } = await import("./contact.server");
    if (!rateLimit(context.ip)) {
      return {
        ok: false as const,
        error: "Too many messages sent recently. Please try again later.",
      };
    }

    try {
      await sendContactEmail(data);
    } catch (err) {
      console.error("[contact] email failed:", err);
      return {
        ok: false as const,
        error:
          "Something went wrong sending your message. Please try again in a moment.",
      };
    }
    return { ok: true as const };
  });