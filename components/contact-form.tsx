"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

const CONTACT_EMAIL = "by.azuolas@gmail.com";

const contactSchema = z.object({
  name: z.string().min(2, "Įveskite vardą"),
  email: z.string().email("Įveskite galiojantį el. pašto adresą"),
  message: z.string().min(10, "Parašykite bent kelis sakinius apie projektą"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputClasses =
  "w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white/40";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = (data: ContactFormValues) => {
    const subject = encodeURIComponent(`Naujas projektas — ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
    window.location.assign(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`);
    setStatus("sent");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/70">
            Vardas
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
            className={inputClasses}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-2 text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">
            El. paštas
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
            className={inputClasses}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-2 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/70">
            Žinutė
          </label>
          <textarea
            id="message"
            rows={5}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
            className={`${inputClasses} rounded-[1.2rem]`}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="mt-2 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
      >
        Siųsti žinutę <ArrowRight className="h-4 w-4" />
      </button>
      {status === "sent" && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className="mt-4 text-sm text-white/50"
        >
          Atidaroma jūsų pašto programa su paruoštu laišku — tiesiog paspauskite siųsti.
        </motion.p>
      )}
    </form>
  );
}
