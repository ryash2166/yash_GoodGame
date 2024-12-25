import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch data from the API
  useEffect(() => {
    const fetchBeer = async () => {
      try {
        const response = await axios.get("https://api.sampleapis.com/beers/ale");
        setBeers(response.data);
      } catch (error) {
        console.error("Error fetching beers:", error);
      }
    };
    fetchBeer();
  }, []);

  // Filter beers based on search input
  const Beers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Beer Explorer</h1>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search for a beer..."
          className="px-4 py-2  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {Beers.map((beer) => (
          <div
            key={beer.id}
            className="rounded-lg shadow-xl bg-white overflow-hidden"
          >
            <img
              src={beer.image}
              alt={beer.name}
              className="w-full h-48 object-contain"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{beer.name}</h2>
              <p className="text-gray-600">{beer.brewery}</p>
              <p className="text-gray-800 mt-2">{beer.style}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
