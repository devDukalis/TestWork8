"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import { weatherApi } from "@/services/weather";
import { useFavorites } from "@/stores/useFavorites";
import { SearchForm } from "@/components/SearchForm";
import { WeatherCard } from "@/components/WeatherCard";

import { Weather } from "@/models";
import { capitalizeFirstLetter } from "@/utils";

import "@/scss/globals.scss";
import styles from "@/app/Home.module.scss";

function HomePage() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const handleSearch = useCallback(async (city: string) => {
    if (!city.trim()) {
      setWeather(null);
      setError("");
      return;
    }

    setLoading(true);
    try {
      const response = await weatherApi.getCurrent(city);
      setWeather(response.data);
      setError("");
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data.message || "Request error"
        : "Unknown error";
      setError(capitalizeFirstLetter(errorMessage));
    } finally {
      setLoading(false);
    }
  }, []);

  const isFavorite = favorites.some((f) => f.name === weather?.name);

  const forecastLink = weather?.name
    ? `/forecast/${encodeURIComponent(weather.name)}`
    : "";

  return (
    <div className={`container py-4 ${styles.container}`}>
      <nav className={`${styles.nav} shadow-sm mb-4`}>
        <div className="d-flex gap-3 flex-wrap">
          <Link href="/" className={`${styles.navLink} nav-link`}>
            Main
          </Link>
          <Link href="/favorites/" className={`${styles.navLink} nav-link`}>
            Favorite Cities
          </Link>
          <Link
            href={forecastLink}
            className={`${styles.navLink} nav-link ${
              !weather ? styles.disabled : ""
            }`}
            aria-disabled={!weather}
          >
            5-Day Forecast
          </Link>
        </div>
      </nav>

      <div className="row justify-content-center">
        <SearchForm onSearch={handleSearch} loading={loading} />
      </div>

      {error && (
        <div className="alert alert-danger mt-4 text-center">{error}</div>
      )}

      {weather && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-8 col-lg-6">
            <WeatherCard
              weather={weather}
              onAddFavorite={() => {
                if (isFavorite) {
                  removeFavorite(weather.name);
                } else {
                  addFavorite({
                    name: weather.name,
                    country: weather.sys.country,
                  });
                }
              }}
              isFavorite={isFavorite}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
