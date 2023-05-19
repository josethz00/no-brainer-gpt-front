'use client';
import { FormEvent, useState } from 'react';

interface SearchBarProps {
    onSearch: (search: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps): JSX.Element {
  const [search, setSearch] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(search);
  };

  return (
        <form onSubmit={handleSubmit} className="max-w-xl w-full bg-white/20 rounded-md overflow-hidden m-auto mt-28">
            <div className="flex items-center h-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-4 text-white opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.873-4.873"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.525 10.818A5.25 5.25 0 116.475 10.818a5.25 5.25 0 0110.05 0z"
                />
              </svg>
              <input
                type="text"
                className="flex-grow px-4 py-2 text-white bg-transparent outline-none"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="text-white px-4 py-2 mr-1 bg-[#065fd4] hover:bg-[#0a5ebe] rounded-md"
                onClick={() => {
                  console.log("Perform search:", search);
                }}
              >
                Search
              </button>
            </div>
        </form>
  );
}

export default SearchBar;
