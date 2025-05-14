import { type FC } from "react";
import Image from "next/image";

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
    <div>
      <div>
        <h3>
          {weather.name}, {weather.sys.country}
          <button
            onClick={onAddFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorite ? "Remove" : "Add"}
          </button>
        </h3>

        <div>
          <div>
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              width={100}
              height={100}
            />
          </div>
          <div>
            <h2>{Math.round(weather.main.temp)} °C</h2>
            <p>{capitalizeFirstLetter(weather.weather[0].description)}</p>
          </div>
        </div>

        <div>
          <div>
            <p>Humidity: {weather.main.humidity} %</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};
