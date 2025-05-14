"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import { weatherApi } from "@/services/weather";
import { useFavorites } from "@/stores/useFavorites";
import { SearchForm } from "@/components/SearchForm";
import { WeatherCard } from "@/components/WeatherCard";
import { Space } from "@/components/Space";

import { Weather } from "@/models";
import { capitalizeFirstLetter } from "@/utils";

function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const handleSearch = useCallback(async (city: string) => {
    if (!city.trim()) {
      setWeather(null);
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

  return (
    <div>
      <nav>
        <Link href={`/`}>Main</Link>
        <Space />
        <Link href={`/favorites/`}>Favorite cities</Link>
        <Space />
        <Link
          href={`/forecast/${weather?.name || ""}`}
          style={{
            pointerEvents: weather ? "auto" : "none",
            opacity: weather ? 1 : 0.5,
          }}
          aria-disabled={!weather}
        >
          Forecast for 5 days
        </Link>
      </nav>

      <SearchForm onSearch={handleSearch} loading={loading} />

      {error && <div>{error}</div>}

      {weather && (
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
      )}
    </div>
  );
}

export default Home;
