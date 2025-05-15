import { type FC } from "react";
import Image from "next/image";
import styles from "./WeatherCard.module.scss";
import { Weather } from "@/models";
import { capitalizeFirstLetter } from "@/utils";

interface Props {
  weather: Weather;
  onAddFavorite: () => void;
  isFavorite: boolean;
}

export const WeatherCard: FC<Props> = ({
  weather,
  onAddFavorite,
  isFavorite,
}) => {
  return (
    <div className={`card ${styles.card} shadow-lg`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className={`mb-0 ${styles.city}`}>
            {weather.name}, {weather.sys.country}
          </h3>

          <button
            onClick={onAddFavorite}
            className={`btn ${styles.favoriteBtn} ${
              isFavorite ? styles.active : ""
            }`}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isFavorite ? "#e74c3c" : "none"}
              stroke="#e74c3c"
              strokeWidth="2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>

        <div className="row align-items-center mb-4">
          <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              width={100}
              height={100}
              className={styles.weatherIcon}
            />
          </div>

          <div className="col-12 col-md-8 text-center text-md-left">
            <h2 className={`display-4 ${styles.temperature}`}>
              {Math.round(weather.main.temp)}°C
            </h2>
            <p className={`lead ${styles.description}`}>
              {capitalizeFirstLetter(weather.weather[0].description)}
            </p>
          </div>
        </div>

        <div className={`row ${styles.details}`}>
          <div className="col-12 col-md-6 mb-2">
            <p className={styles.detailItem}>
              <span className={styles.label}>Humidity:</span>
              <span className={styles.value}>{weather.main.humidity}%</span>
            </p>
          </div>
          <div className="col-12 col-md-6 mb-2">
            <p className={styles.detailItem}>
              <span className={styles.label}>Wind:</span>
              <span className={styles.value}>{weather.wind.speed} m/s</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
