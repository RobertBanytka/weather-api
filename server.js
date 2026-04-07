import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`+
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation,weather_code,uv_index`+
    `&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,uv_index,cape`+
    `&forecast_days=2&wind_speed_unit=kmh&timezone=auto`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "API error" });
  }
});

app.listen(3000, () => console.log("API działa"));
