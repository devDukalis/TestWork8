"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/stores/useFavorites";
import { weatherApi } from "@/services/weather";
import { WeatherCard } from "@/components/WeatherCard";
import { Loader } from "@components//Loader";

import type { FavoriteCity } from "@/stores/useFavorites";
import { Weather } from "@/models";

function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const [weatherData, setWeatherData] = useState<Weather[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data: Array<Weather | null> = await Promise.all(
        favorites.map((f: FavoriteCity) =>
          weatherApi
            .getCurrent(f.name)
            .then((res) => res.data as Weather)
            .catch(() => null)
        )
      );

      setWeatherData(data.filter((item): item is Weather => item !== null));
      setLoading(false);
    };

    fetchData();
  }, [favorites]);

  return (
    <div>
      <div>
        <Link href={`/`}>Main</Link>
      </div>
      <h2>Favorite cities</h2>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {weatherData.length === 0 ? (
            <span>No cities found</span>
          ) : (
            weatherData.map((weather) => (
              <div key={weather.id}>
                <WeatherCard
                  weather={weather}
                  isFavorite={true}
                  onAddFavorite={() => removeFavorite(weather.name)}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
