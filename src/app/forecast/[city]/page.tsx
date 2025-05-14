"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { weatherApi } from "@/services/weather";
import { Loader } from "@/components/Loader";

import { ForecastItem } from "@/models";

function ForecastPage() {
  const params = useParams();
  const router = useRouter();
  const city = params.city as string;
  const [forecast, setForecast] = useState<ForecastItem[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;

    const loadForecast = async () => {
      try {
        const response = await weatherApi.getForecast(city);
        const daily = response.data.list.reduce(
          (acc: Record<string, ForecastItem[]>, item: ForecastItem) => {
            const date = item.dt_txt.split(" ")[0];
            acc[date] = acc[date] || [];
            acc[date].push(item);
            return acc;
          },
          {} as Record<string, ForecastItem[]>
        );

        setForecast(Object.values(daily).slice(0, 5));
      } catch (error) {
        setError("Couldn't upload forecast");
        console.error("Error loading forecast:", error);
      } finally {
        setLoading(false);
      }
    };

    loadForecast();
  }, [city]);

  return (
    <div>
      <h2>Forecast for {city}</h2>

      {error && <div>{error}</div>}

      <button onClick={() => router.back()}>Back</button>

      {loading ? (
        <Loader />
      ) : (
        <div>
          {forecast.map((day) => (
            <div key={day[0].dt_txt}>
              <div>
                <div>
                  <h5>{new Date(day[0].dt * 1000).toLocaleDateString()}</h5>
                  <p>
                    Max:{" "}
                    {Math.round(Math.max(...day.map((t) => t.main.temp_max)))}°C
                  </p>
                  <p>
                    Min:{" "}
                    {Math.round(Math.min(...day.map((t) => t.main.temp_min)))}°C
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ForecastPage;
