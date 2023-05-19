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
    <form onSubmit={handleSubmit} className="my-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-400 p-2 rounded-lg w-full"
        placeholder="Search..."
      />
    </form>
  );
}

export default SearchBar;
