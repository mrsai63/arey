import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";

export function ContactCTA() {
  const [sent, setSent] = useState(false);
  const { data } = useCMS();
  const contact = data.contact;

  return (
    <section className="container-bs py-32" id="contact">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface/40 p-8 md:p-14">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/30 blur-[120px]" />
        <div className="relative grid gap-12 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.25em]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {contact.eyebrow}
            </div>
            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-6xl text-foreground">
              {contact.title}
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              {contact.sub}
            </p>

            <ul className="mt-10 space-y-4 text-sm">
              <li className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary"><Mail className="h-4 w-4" /></span> {contact.email}</li>
              <li className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary"><Phone className="h-4 w-4" /></span> {contact.phone}</li>
              <li className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary"><MapPin className="h-4 w-4" /></span> {contact.address}</li>
            </ul>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass rounded-3xl p-6 md:p-8"
          >
            <div className="grid gap-4">
              <Field label="Your name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Company" name="company" />
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tell us about your project</label>
                <textarea rows={5} required className="mt-2 w-full resize-none rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
              </div>
              <button
                type="submit"
                className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-button font-semibold text-primary-foreground transition-all hover:scale-[1.02] glow-blue"
              >
                {sent ? "Sent ✓" : <>Send Message <Send className="h-4 w-4 transition-transform group-hover:-rotate-12 group-hover:translate-x-0.5" /></>}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        id={name} name={name} type={type} required
        className="mt-2 w-full rounded-full border border-border bg-background/60 px-5 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}
