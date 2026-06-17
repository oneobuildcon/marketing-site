export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-white">
            One O <span className="text-amber-light">Buildcon</span>
          </h3>
          <p className="mt-2 text-sm">From blueprint to brilliance.</p>
        </div>

        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Phone: +91 88060 29907</li>
            <li>Email: oneobuildcon@gmail.com</li>
            <li>Address: Pune, Maharashtra, India</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Quick Links</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href="/services" className="hover:text-amber-light">Services</a></li>
            <li><a href="/projects" className="hover:text-amber-light">Projects</a></li>
            <li><a href="/contact" className="hover:text-amber-light">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center text-xs">
        © {new Date().getFullYear()} One O Buildcon. All rights reserved.
      </div>
    </footer>
  );
}
