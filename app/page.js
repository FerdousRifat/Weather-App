import WeatherDisplay from "@/components/WeatherDisplay";
import AboutSection from "@/components/AboutSection";

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-sky-100 to-slate-50 pt-10 text-center">
        <h1 className="text-3xl font-extrabold text-sky-800 sm:text-4xl">
          Check the weather anywhere
        </h1>
        <p className="mt-2 text-slate-600">Live data from Open-Meteo</p>
      </section>
      <WeatherDisplay />
      <AboutSection />
    </>
  );
}
