# SkyNow – Weather App

A simple, responsive weather app built with **Next.js (App Router)**, **Tailwind CSS** and the free **[Open-Meteo API](https://open-meteo.com/)** (no API key required).

## Features

- 4 pages: Home, About, Services, Contact
- Reusable `Header` and `Footer` components with responsive navigation
- Weather display showing **temperature, time, interval, humidity and wind speed**
- City search (Open-Meteo Geocoding API) and next-12-hours forecast
- Fully responsive with Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  layout.js          # Root layout (Header + Footer)
  page.js            # Home (Weather Display + About section)
  about/page.js
  services/page.js
  contact/page.js
components/
  Header.js
  Footer.js
  WeatherDisplay.js
  AboutSection.js
```

## API

- Forecast: `https://api.open-meteo.com/v1/forecast`
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
