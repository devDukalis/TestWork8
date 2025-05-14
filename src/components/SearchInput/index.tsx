"use client";

import { type FC, useEffect, useState } from "react";

interface Props {
  onSearch: (value: string) => void;
  debounceTime?: number;
  placeholder?: string;
  name?: string;
}

export const SearchInput: FC<Props> = ({
  onSearch,
  debounceTime = 500,
  placeholder = "Enter the city...",
  name = "city",
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [inputValue, debounceTime, onSearch]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={inputValue}
      name={name}
      onChange={(e) => setInputValue(e.target.value)}
      aria-label="Enter the city..."
    />
  );
};
