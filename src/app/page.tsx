import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ResultBox from './components/ResultBox';

function Home() {
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (searchTerm: string) => {
    // TODO: Implement actual search logic here
    setResults([`Result for ${searchTerm}`]);
  };

  return (
    <main>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <ResultBox results={results} />
    </main>
  );
}

export default Home;
