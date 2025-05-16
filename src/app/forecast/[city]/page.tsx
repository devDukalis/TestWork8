"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Loader } from "@/components/Loader";
import { ForecastDayCard } from "@/components/ForecastDayCard";
import { BackButton } from "@/components/BackButton";
import { NavBar } from "@/components/NavBar";
import { ErrorAlert } from "@/components/ErrorAlert";
import { ForecastTitle } from "@/components/ForecastTitle";

import { weatherApi } from "@/services/weather";
import { ForecastItem } from "@/models";
import styles from "@/app/forecast/[city]/ForecastPage.module.scss";

function ForecastPage() {
  const params = useParams();
  const city = decodeURIComponent(params.city as string);
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
            const date = new Date(item.dt * 1000);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const localDateKey = `${year}-${month}-${day}`;

            if (!acc[localDateKey]) {
              acc[localDateKey] = [];
            }
            acc[localDateKey].push(item);
            return acc;
          },
          {} as Record<string, ForecastItem[]>
        );

        const sortedDates = Object.keys(daily).sort();
        const nextFiveDays = sortedDates.slice(0, 5).map((key) => daily[key]);
        setForecast(nextFiveDays);
      } catch (error) {
        setError("Couldn't load forecast data");
        console.error("Error loading forecast:", error);
      } finally {
        setLoading(false);
      }
    };

    loadForecast();
  }, [city]);

  return (
    <div className={`container py-4 ${styles.container}`}>
      <NavBar>
        <BackButton value="Back to Main" />
      </NavBar>

      <ForecastTitle value="5-Day Forecast for" city={city} />

      {error && <ErrorAlert message={error} />}

      {loading ? (
        <Loader />
      ) : (
        <div className="row g-4">
          {forecast.map((day) => (
            <ForecastDayCard key={day[0].dt_txt} day={day} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ForecastPage;
