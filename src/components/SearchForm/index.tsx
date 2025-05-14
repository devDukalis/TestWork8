"use client";

import { type FC, FormEvent, useCallback } from "react";

import { SearchInput } from "@/components/SearchInput";
import { Loader } from "@/components/Loader";

interface Props {
  onSearch: (city: string) => void;
  loading?: boolean;
}

export const SearchForm: FC<Props> = ({ onSearch, loading }) => {
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const city = formData.get("city") as string;
      onSearch(city.trim());
    },
    [onSearch]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <>{loading && <Loader />}</>

        <SearchInput
          onSearch={onSearch}
          placeholder="Type city name"
          name="city"
        />
      </div>
    </form>
  );
};
