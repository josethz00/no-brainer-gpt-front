'use client';
import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ResultBox from './components/ResultBox';

function Home() {
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async (searchTerm: string) => {
    const queryResults = await fetch('http://localhost:5001/qa/answer', {
      method: 'POST',
      body: JSON.stringify({ question: searchTerm }),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then((res) => res.json());

    console.log(queryResults);

    setResults([queryResults.answer]);
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
