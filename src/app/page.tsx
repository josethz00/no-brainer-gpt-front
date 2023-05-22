'use client';
import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ResultBox from './components/ResultBox';

function Home() {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (searchTerm: string) => {
    setIsLoading(true);
    const queryResults = await fetch('http://localhost:5001/qa/answer', {
      method: 'POST',
      body: JSON.stringify({ question: searchTerm }),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then((res) => res.json());

    console.log(queryResults);

    setResults([queryResults.answer]);
    setIsLoading(false);
  };

  return (
    <main>
      <Header />
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8"></path>
          </svg>
        </div>
      ) : (
        <ResultBox results={results} />
      )}
    </main>
  );
}

export default Home;
