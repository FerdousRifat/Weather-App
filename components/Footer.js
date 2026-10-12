import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
        <div>
          <h3 className="mb-2 text-lg font-bold text-white">🌤️ SkyNow</h3>
          <p className="text-sm">
            A simple weather app built with Next.js and Tailwind CSS.
          </p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link className="hover:text-white" href="/">Home</Link></li>
            <li><Link className="hover:text-white" href="/about">About</Link></li>
            <li><Link className="hover:text-white" href="/services">Services</Link></li>
            <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-white">Data Source</h4>
          <p className="text-sm">
            Weather data by{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-white"
            >
              Open-Meteo
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-slate-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} SkyNow. All rights reserved.
      </div>
    </footer>
  );
}
