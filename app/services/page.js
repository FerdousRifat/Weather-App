export const metadata = { title: "Services - SkyNow" };

const services = [
  { icon: "🌡️", title: "Current Temperature", text: "See the real-time temperature of any city in °C." },
  { icon: "💧", title: "Humidity", text: "Know the relative humidity level in the air right now." },
  { icon: "💨", title: "Wind Speed", text: "Check how fast the wind is blowing in km/h." },
  { icon: "🕒", title: "Time & Interval", text: "View the observation time and the data update interval." },
  { icon: "⏰", title: "Hourly Forecast", text: "Look at the next 12 hours of temperature and conditions." },
  { icon: "🔎", title: "City Search", text: "Search any city in the world using the geocoding API." },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-2 text-center text-3xl font-bold text-sky-700">Our Services</h1>
      <p className="mb-8 text-center text-slate-600">
        Everything you need to know about the weather, in one place.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="text-4xl">{s.icon}</div>
            <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
