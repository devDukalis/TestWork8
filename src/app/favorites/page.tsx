"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useFavorites } from "@/stores/useFavorites";

import { WeatherCard } from "@/components/WeatherCard";
import { Loader } from "@/components/Loader";
import { Icon } from "@/components/Icon";
import { NavBar } from "@/components/NavBar";
import { BackButton } from "@/components/BackButton";
import { FavoriteCitiesTitle } from "@/components/FavoriteCitiesTitle";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { NoFavoriteCitiesMessage } from "@/components/NoFavoriteCitiesMessage";
import { FavoriteCounter } from "@/components/FavoriteCounter";

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
                <Icon
                  width={48}
                  height={48}
                  pathD="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                />

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
