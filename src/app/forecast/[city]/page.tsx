"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "@/app/forecast/[city]/ForecastPage.module.scss";
import { weatherApi } from "@/services/weather";
import { Loader } from "@/components/Loader";
import { ForecastItem } from "@/models";
import Image from "next/image";

function ForecastPage() {
  const params = useParams();
  const router = useRouter();
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
      <nav className={`${styles.nav} shadow-sm mb-4`}>
        <button
          onClick={() => router.back()}
          className={`${styles.backButton} btn`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
          Back to Main
        </button>
      </nav>

      <h2 className={`text-center mb-5 ${styles.title}`}>
        5-Day Forecast for {city}
      </h2>

      {error && (
        <div className="alert alert-danger text-center mb-4">{error}</div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Loader />
        </div>
      ) : (
        <div className="row g-4">
          {forecast.map((day) => (
            <div key={day[0].dt_txt} className="col-12 col-md-6 col-xl-4">
              <div className={`card ${styles.forecastCard} shadow-sm`}>
                <div className="card-body">
                  <h5 className={styles.dayTitle}>
                    {new Date(day[0].dt * 1000).toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </h5>

                  <div className={styles.temperatureWrapper}>
                    <div className={styles.tempItem}>
                      <span className={styles.tempLabel}>Max</span>
                      <span className={styles.tempValue}>
                        {Math.round(
                          Math.max(...day.map((t) => t.main.temp_max))
                        )}
                        °C
                      </span>
                    </div>
                    <div className={styles.tempItem}>
                      <span className={styles.tempLabel}>Min</span>
                      <span className={styles.tempValue}>
                        {Math.round(
                          Math.min(...day.map((t) => t.main.temp_min))
                        )}
                        °C
                      </span>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-3 mt-3">
                    {day.map((timeSlot) => (
                      <div key={timeSlot.dt} className={styles.timeSlot}>
                        <span className={styles.time}>
                          {new Date(timeSlot.dt * 1000).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>

                        <Image
                          src={`https://openweathermap.org/img/wn/${timeSlot.weather[0].icon}.png`}
                          alt={timeSlot.weather[0].description}
                          width={50}
                          height={50}
                          className={styles.weatherIcon}
                        />

                        <span className={styles.temp}>
                          {Math.round(timeSlot.main.temp)}°C
                        </span>
                      </div>
                    ))}
                  </div>
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
