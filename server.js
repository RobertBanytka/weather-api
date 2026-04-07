import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Brak lat/lon" });
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation,weather_code,uv_index` +
    `&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,uv_index,cape` +
    `&forecast_days=2&wind_speed_unit=kmh&timezone=auto`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "API error" });
  }
});

// 👇 DODAJ TO (ważne dla Render!)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("API działa na porcie", PORT));
