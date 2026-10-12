export const metadata = { title: "About - SkyNow" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-sky-700">About This App</h1>
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow">
        <p>
          SkyNow is a simple weather application created as a Next.js assignment.
          It displays the current weather for a city, including temperature,
          humidity, wind speed, observation time and the data update interval.
        </p>
        <p>
          The app fetches data directly from the free{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
            className="text-sky-600 underline"
          >
            Open-Meteo API
          </a>
          , which needs no API key. The interface is styled with Tailwind CSS
          and is fully responsive.
        </p>
        <h2 className="pt-2 text-xl font-semibold">Technologies used</h2>
        <ul className="list-inside list-disc space-y-1 text-slate-700">
          <li>Next.js (App Router)</li>
          <li>React</li>
          <li>Tailwind CSS</li>
          <li>Open-Meteo Forecast &amp; Geocoding API</li>
        </ul>
      </div>
    </div>
  );
}
