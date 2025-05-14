import axios, { AxiosResponse } from "axios";

import { WeatherResponse, ForecastResponse } from "@/models";
import { API_KEY, BASE_URL } from "@/utils/constants";

export const weatherApi = {
  async getCurrent(city: string): Promise<WeatherResponse> {
    return axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
        lang: "en",
      },
    });
  },

  async getForecast(city: string): Promise<AxiosResponse<ForecastResponse>> {
    return axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
        lang: "en",
      },
    });
  },
};
