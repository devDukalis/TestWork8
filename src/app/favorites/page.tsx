"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "@/app/favorites/FavoritesPage.module.scss";
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
      <nav className={`${styles.nav} shadow-sm mb-4`}>
        <Link href="/" className={`${styles.navLink} nav-link`}>
          ← Back to Main
        </Link>
      </nav>

      <h2 className={`text-center mb-5 ${styles.title}`}>Favorite Cities</h2>

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Loader />
        </div>
      ) : (
        <div className="row g-4">
          {weatherData.length === 0 ? (
            <div className="col-12">
              <div className={`alert alert-info ${styles.emptyState}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="currentColor"
                  className="bi bi-star"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>
                <p className="mt-3 mb-0">No favorite cities added yet</p>
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
                    <button
                      onClick={handleLoadMore}
                      className="btn btn-primary"
                    >
                      Load more
                    </button>
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
