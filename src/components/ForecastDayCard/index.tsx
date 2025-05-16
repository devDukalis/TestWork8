"use client";

import Image from "next/image";

import { ForecastItem } from "@/models";
import styles from "@/components/ForecastDayCard/ForecastDayCard.module.scss";

interface ForecastDayCardProps {
  day: ForecastItem[];
}

export const ForecastDayCard = ({ day }: ForecastDayCardProps) => {
  return (
    <div className="col-12 col-md-6 col-xl-4">
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
                {Math.round(Math.max(...day.map((t) => t.main.temp_max)))}°C
              </span>
            </div>

            <div className={styles.tempItem}>
              <span className={styles.tempLabel}>Min</span>
              <span className={styles.tempValue}>
                {Math.round(Math.min(...day.map((t) => t.main.temp_min)))}°C
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
  );
};
