import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | One O Buildcon",
};

export default function Contact() {
  return (
    <main>
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Tell us about your project and we&apos;ll get back to you within
            one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-navy">Get in Touch</h2>
            <ul className="mt-4 space-y-2 text-navy/70">
              <li>Phone: +91 88060 29907</li>
              <li>Email: oneobuildcon@gmail.com</li>
              <li>Address: Pune, Maharashtra, India</li>
              <li>Hours: Mon - Sat, 9am - 6pm</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
