import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold text-sky-700">About SkyNow</h2>
        <p className="mb-6 text-slate-600">
          SkyNow is a simple weather app that shows live temperature, humidity,
          wind speed, update interval and local time for any city in the world.
          It is built with Next.js and Tailwind CSS and uses the free
          Open-Meteo API, so no API key is required.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["⚡", "Fast", "Quick loading with Next.js"],
            ["📱", "Responsive", "Works on mobile, tablet and desktop"],
            ["🆓", "Free", "Powered by a free weather API"],
          ].map(([icon, title, text]) => (
            <div key={title} className="rounded-xl bg-sky-50 p-5">
              <div className="text-3xl">{icon}</div>
              <h3 className="mt-2 font-semibold">{title}</h3>
              <p className="text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>
        <Link
          href="/about"
          className="mt-6 inline-block rounded-lg bg-sky-600 px-5 py-2 text-white transition hover:bg-sky-700"
        >
          Learn more
        </Link>
      </div>
    </section>
  );
}
