"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useFavorites } from "@/stores/useFavorites";

import { WeatherCard } from "@/components/WeatherCard";
import { Loader } from "@components//Loader";
import { EmptyFavoriteCityIcon } from "@components//EmptyFavoriteCityIcon";
import { NavBar } from "@/components/NavBar";
import { BackButton } from "@/components/BackButton";
import { FavoriteCitiesTitle } from "@components//FavoriteCitiesTitle";
import { LoadMoreButton } from "@components//LoadMoreButton";
import { NoFavoriteCitiesMessage } from "@components//NoFavoriteCitiesMessage";
import { FavoriteCounter } from "@components//FavoriteCounter";

import { weatherApi } from "@/services/weather";
import type { FavoriteCity } from "@/stores/useFavorites";
import { Weather } from "@/models";
import styles from "@/app/favorites/FavoritesPage.module.scss";

function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const [weatherData, setWeatherData] = useState<Weather[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCities, setVisibleCities] = useState(0);

  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const limit = isMobile ? 5 : isTablet ? 10 : Infinity;

  useEffect(() => {
    setVisibleCities(limit);
  }, [limit]);

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

  const showLoadMore =
    weatherData.length > visibleCities && (isMobile || isTablet);

  const handleLoadMore = () => setVisibleCities((prev) => prev + limit);

  return (
    <div className={`container py-4 ${styles.container}`}>
      <NavBar>
        <BackButton value="Back to Main" />
      </NavBar>

      <FavoriteCitiesTitle value="Favorite Cities" />

      <FavoriteCounter count={favorites.length} />

      {loading ? (
        <Loader />
      ) : (
        <div className="row g-4">
          {weatherData.length === 0 ? (
            <div className="col-12">
              <div className={`alert alert-info ${styles.emptyState}`}>
                <EmptyFavoriteCityIcon />
                <NoFavoriteCitiesMessage value="No favorite cities added yet" />
              </div>
            </div>
          ) : (
            <>
              {weatherData.slice(0, visibleCities).map((weather) => (
                <div key={weather.id} className="col-12 col-md-6 col-xl-4">
                  <WeatherCard
                    weather={weather}
                    isFavorite={true}
                    onAddFavorite={() => removeFavorite(weather.name)}
                  />
                </div>
              ))}

              {showLoadMore && (
                <div className="col-12">
                  <div className="text-center mt-4">
                    <LoadMoreButton
                      handleClick={handleLoadMore}
                      value="Load more"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
